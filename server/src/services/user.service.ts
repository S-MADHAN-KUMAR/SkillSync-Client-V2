import bcrypt from "bcryptjs";
import UserRepository from "../repositories/user.repository";
import CandidateRepository from "../repositories/candidate.repository";
import EmployerRepository from "../repositories/employer.repository";
import MailService from "./mail.service";

/**
 * User Service — Single Responsibility + Dependency Inversion
 * Business logic for authentication and user management.
 * Depends on repositories (injected), not on concrete DB clients.
 */
class UserService {
    private userRepo: UserRepository;
    private candidateRepo: CandidateRepository;
    private employerRepo: EmployerRepository;
    private mailService: MailService;

    constructor(
        userRepo: UserRepository,
        candidateRepo: CandidateRepository,
        employerRepo: EmployerRepository,
        mailService: MailService
    ) {
        this.userRepo = userRepo;
        this.candidateRepo = candidateRepo;
        this.employerRepo = employerRepo;
        this.mailService = mailService;
    }

    /**
     * Generate a 6-digit OTP
     */
    private generateOtp(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    /**
     * Register a new user
     * Matches frontend payload: { fullName, email, mobile_number, password, userType }
     */
    async register(data: {
        fullName: string;
        email: string;
        mobile_number?: string;
        password: string;
        userType: string;
    }) {
        // Check if user already exists
        const existingUser = await this.userRepo.findByEmail(data.email);
        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        // Hash password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        // Generate OTP
        const otp = this.generateOtp();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Create user
        const user = await this.userRepo.create({
            full_name: data.fullName,
            email: data.email,
            mobile_number: data.mobile_number,
            password: hashedPassword,
            user_type: data.userType,
            otp: otp,
            otp_expires_at: otpExpiresAt.toISOString(),
        });

        // Create corresponding profile table entry
        if (data.userType === "candidate") {
            await this.candidateRepo.create(user.id);
        } else if (data.userType === "employer") {
            await this.employerRepo.create(user.id);
        }

        // Send OTP via email
        await this.mailService.sendVerificationEmail(data.email, data.fullName, otp);
        console.log(`📧 OTP for ${data.email}: ${otp}`);

        // Return user without password
        const { password, otp: userOtp, ...safeUser } = user;
        return safeUser;
    }

    /**
     * Login user
     * Matches frontend payload: { email, password }
     * Returns: { id, email, fullName, userType, is_onboarded }
     */
    async login(email: string, password: string) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new Error("Invalid email or password");
        }

        // Check if user is verified
        if (!user.is_verified) {
            throw new Error("Please verify your email before logging in");
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        // Return normalized data matching frontend expectations
        return {
            id: user.id,
            email: user.email,
            fullName: user.full_name,
            userType: user.user_type,
            is_onboarded: user.is_onboarded,
        };
    }

    /**
     * Verify OTP
     * Matches frontend payload: { email, otp }
     */
    async verifyOtp(email: string, otp: string) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }

        if (user.is_verified) {
            throw new Error("User is already verified");
        }

        if (!user.otp || user.otp !== otp) {
            throw new Error("Invalid OTP");
        }

        // Check OTP expiry
        if (user.otp_expires_at && new Date(user.otp_expires_at) < new Date()) {
            throw new Error("OTP has expired. Please request a new one");
        }

        // Mark user as verified
        const verifiedUser = await this.userRepo.verifyUser(email);
        const { password, otp: userOtp, ...safeUser } = verifiedUser;
        return safeUser;
    }

    /**
     * Resend OTP
     * Matches frontend payload: { email }
     */
    async resendOtp(email: string) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }

        if (user.is_verified) {
            throw new Error("User is already verified");
        }

        // Generate new OTP
        const otp = this.generateOtp();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await this.userRepo.updateOtp(user.id, otp, otpExpiresAt);

        // Send OTP via email
        await this.mailService.sendVerificationEmail(user.email, user.full_name, otp);
        console.log(`📧 New OTP for ${email}: ${otp}`);

        return { message: "OTP sent successfully" };
    }

    /**
     * Get user by ID
     */
    async getById(id: number) {
        const user = await this.userRepo.findById(id);
        if (!user) return null;
        const { password, otp, ...safeUser } = user;
        return safeUser;
    }

    /**
     * Update user
     * Used by frontend: PUT /api/users/:id with { is_onboarded: true }
     */
    async update(id: number, data: Record<string, any>) {
        // If updating is_onboarded specifically
        if (data.is_onboarded !== undefined) {
            const user = await this.userRepo.updateOnboardedStatus(id, data.is_onboarded);
            if (!user) return null;
            const { password, otp, ...safeUser } = user;
            return safeUser;
        }

        const user = await this.userRepo.update(id, data);
        if (!user) return null;
        const { password, otp, ...safeUser } = user;
        return safeUser;
    }

    /**
   * Forgot Password
   * Generates a reset OTP and logs it
   */
    async forgotPassword(email: string) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new Error("If an account exists with this email, a reset link has been sent.");
        }

        const otp = this.generateOtp();
        const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins for reset

        await this.userRepo.updateOtp(user.id, otp, otpExpiresAt);

        // Send reset link via email
        await this.mailService.sendPasswordResetEmail(user.email, user.full_name, otp);
        console.log(`🔑 Password Reset OTP for ${email}: ${otp}`);
        console.log(`🔗 Reset Link: http://localhost:3000/reset-password?email=${email}&code=${otp}`);

        return { message: "Reset link sent successfully" };
    }

    /**
     * Reset Password
     */
    async resetPassword(email: string, otp: string, newPassword: string) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }

        if (!user.otp || user.otp !== otp) {
            throw new Error("Invalid or expired reset code");
        }

        if (user.otp_expires_at && new Date(user.otp_expires_at) < new Date()) {
            throw new Error("Reset code has expired");
        }

        // Hash new password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user: set new password and CLEAR otp fields
        await this.userRepo.update(user.id, {
            password: hashedPassword,
            otp: null,
            otp_expires_at: null,
        });

        return { message: "Password reset successful" };
    }

    /**
     * Get all users
     */
    async getAll() {
        const users = await this.userRepo.findAll();
        return users.map((user: any) => {
            const { password, otp, ...safeUser } = user;
            return safeUser;
        });
    }
}

export default UserService;
