import { Request, Response } from "express";
import UserService from "../services/user.service";
import { ApiResponse, asyncHandler } from "../utils";

/**
 * User Controller — Single Responsibility
 * Handles ONLY HTTP request/response for user & auth endpoints.
 */
class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    /**
     * POST /api/users/register
     * Body: { fullName, email, mobile_number, password, userType }
     */
    register = asyncHandler(async (req: Request, res: Response) => {
        const { fullName, email, mobile_number, password, userType } = req.body;

        if (!fullName || !email || !password || !userType) {
            return ApiResponse.badRequest(res, "fullName, email, password, and userType are required");
        }

        const user = await this.userService.register({
            fullName,
            email,
            mobile_number,
            password,
            userType,
        });

        ApiResponse.created(res, user, "User registered successfully. Please verify your email.");
    });

    /**
     * POST /api/users/login
     * Body: { email, password }
     */
    login = asyncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return ApiResponse.badRequest(res, "Email and password are required");
        }

        const userData = await this.userService.login(email, password);
        ApiResponse.success(res, userData, "Login successful");
    });

    /**
     * POST /api/users/verify-otp
     * Body: { email, otp }
     */
    verifyOtp = asyncHandler(async (req: Request, res: Response) => {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return ApiResponse.badRequest(res, "Email and OTP are required");
        }

        const user = await this.userService.verifyOtp(email, otp);
        ApiResponse.success(res, user, "Email verified successfully");
    });

    /**
   * POST /api/users/resend-otp
   * Body: { email }
   */
    resendOtp = asyncHandler(async (req: Request, res: Response) => {
        const { email } = req.body;

        if (!email) {
            return ApiResponse.badRequest(res, "Email is required");
        }

        const result = await this.userService.resendOtp(email);
        ApiResponse.success(res, result, "OTP resent successfully");
    });

    /**
     * POST /api/users/forgot-password
     * Body: { email }
     */
    forgotPassword = asyncHandler(async (req: Request, res: Response) => {
        const { email } = req.body;

        if (!email) {
            return ApiResponse.badRequest(res, "Email is required");
        }

        const result = await this.userService.forgotPassword(email);
        ApiResponse.success(res, result);
    });

    /**
     * POST /api/users/reset-password
     * Body: { email, otp, newPassword }
     */
    resetPassword = asyncHandler(async (req: Request, res: Response) => {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return ApiResponse.badRequest(res, "Email, OTP, and newPassword are required");
        }

        const result = await this.userService.resetPassword(email, otp, newPassword);
        ApiResponse.success(res, result);
    });

    /**
     * GET /api/users/:id
     */
    getById = asyncHandler(async (req: Request, res: Response) => {
        const id = parseInt(req.params.id as string);
        const user = await this.userService.getById(id);

        if (!user) {
            return ApiResponse.notFound(res, "User not found");
        }

        ApiResponse.success(res, user);
    });

    /**
     * PUT /api/users/:id
     * Body: { is_onboarded: true } (or other fields)
     */
    update = asyncHandler(async (req: Request, res: Response) => {
        const id = parseInt(req.params.id as string);
        const user = await this.userService.update(id, req.body);

        if (!user) {
            return ApiResponse.notFound(res, "User not found");
        }

        ApiResponse.success(res, user, "User updated successfully");
    });

    /**
     * GET /api/users
     */
    getAll = asyncHandler(async (_req: Request, res: Response) => {
        const users = await this.userService.getAll();
        ApiResponse.success(res, users);
    });
}

export default UserController;
