import nodemailer from "nodemailer";
import envConfig from "../config/env.config";

/**
 * Mail Service — handles all outgoing email communications.
 * Uses Gmail SMTP with the provided application password.
 */
class MailService {
    private transporter: nodemailer.Transporter;
    private isVerified: boolean = false;

    constructor() {
        console.log(`📪 Initializing MailService for: ${envConfig.COMPANY_MAIL}`);
        if (!envConfig.MAIL_PASSWORD) {
            console.error("❌ MailService: MAIL_PASSWORD is not set!");
        } else {
            console.log(`🔐 Mail password loaded (Length: ${envConfig.MAIL_PASSWORD.length})`);
        }
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: envConfig.COMPANY_MAIL,
                pass: envConfig.MAIL_PASSWORD,
            },
        });
        
        // Verify transporter configuration
        this.verifyConnection();
    }

    /**
     * Verify SMTP connection
     */
    private async verifyConnection() {
        try {
            await this.transporter.verify();
            this.isVerified = true;
            console.log("✅ Mail service verified and ready to send emails");
        } catch (error) {
            this.isVerified = false;
            console.error("❌ Mail service verification failed:", error);
            console.error("⚠️  Please check:");
            console.error("   1. COMPANY_MAIL and MAIL_PASSWORD are set in .env");
            console.error("   2. Gmail 2-step verification is enabled");
            console.error("   3. App password is correctly generated and used");
            console.error("   4. Less secure app access is enabled (if not using app password)");
        }
    }

    /**
     * Send verification OTP email
     */
    async sendVerificationEmail(email: string, fullName: string, otp: string) {
        if (!this.isVerified) {
            console.warn("⚠️  Mail service not verified, attempting to send anyway...");
        }

        const mailOptions = {
            from: `"SkillSync Team" <${envConfig.COMPANY_MAIL}>`,
            to: email,
            subject: "Verify your SkillSync Account",
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="color: #000; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -1px;">SkillSync</h1>
                    </div>
                    <div style="padding: 20px; text-align: center;">
                        <h2 style="color: #333; margin-bottom: 15px;">Welcome to SkillSync, ${fullName}!</h2>
                        <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 25px;">
                            Thanks for choosing SkillSync. To complete your registration and secure your profile, please use the 6-digit verification code below:
                        </p>
                        <div style="background-color: #f4f4f4; padding: 20px; border-radius: 10px; font-size: 32px; font-weight: 800; color: #000; letter-spacing: 5px; display: inline-block; margin-bottom: 25px;">
                            ${otp}
                        </div>
                        <p style="color: #999; font-size: 14px; margin-top: 20px;">
                            This code will expire in 10 minutes. If you did not request this email, please ignore it.
                        </p>
                    </div>
                    <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; text-align: center; color: #999; font-size: 12px;">
                        &copy; 2026 SkillSync Inc. All rights reserved.
                    </div>
                </div>
            `,
        };

        try {
            console.log(`📧 Attempting to send verification email to ${email}...`);
            const info = await this.transporter.sendMail(mailOptions);
            console.log(`✅ Verification email sent to ${email}`);
            console.log(`📬 Message ID: ${info.messageId}`);
            console.log(`📝 Response: ${info.response}`);
            return info;
        } catch (error: any) {
            console.error(`❌ Failed to send verification email to ${email}`);
            console.error(`Error details:`, error);
            if (error.code) {
                console.error(`Error code: ${error.code}`);
            }
            if (error.response) {
                console.error(`SMTP Response: ${error.response}`);
            }
            throw new Error("Failed to send verification email. Please check server logs.");
        }
    }

    /**
     * Send password reset OTP email
     */
    async sendPasswordResetEmail(email: string, fullName: string, otp: string) {
        if (!this.isVerified) {
            console.warn("⚠️  Mail service not verified, attempting to send anyway...");
        }

        const resetLink = `http://localhost:3000/reset-password?email=${email}&code=${otp}`;

        const mailOptions = {
            from: `"SkillSync Support" <${envConfig.COMPANY_MAIL}>`,
            to: email,
            subject: "Reset your SkillSync Password",
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #fcfcfc;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="color: #000; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -1px;">SkillSync</h1>
                    </div>
                    <div style="padding: 20px; text-align: center; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                        <h2 style="color: #333; margin-bottom: 15px;">Hello ${fullName},</h2>
                        <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 25px;">
                            We received a request to reset your password. Use the code below to complete the reset process:
                        </p>
                        <div style="background-color: #f4f4f4; padding: 20px; border-radius: 10px; font-size: 32px; font-weight: 800; color: #000; letter-spacing: 5px; display: inline-block; margin-bottom: 25px;">
                            ${otp}
                        </div>
                        <div style="margin-top: 10px;">
                            <p style="color: #666; margin-bottom: 20px;">Or click the button below:</p>
                            <a href="${resetLink}" style="background-color: #000; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Reset Password</a>
                        </div>
                        <p style="color: #999; font-size: 14px; margin-top: 30px;">
                            This code will expire in 15 minutes. If you did not request a password reset, your account is still secure and no further action is required.
                        </p>
                    </div>
                    <div style="padding-top: 20px; text-align: center; color: #999; font-size: 12px;">
                        &copy; 2026 SkillSync Support.
                    </div>
                </div>
            `,
        };

        try {
            console.log(`📧 Attempting to send password reset email to ${email}...`);
            const info = await this.transporter.sendMail(mailOptions);
            console.log(`✅ Password reset email sent to ${email}`);
            console.log(`📬 Message ID: ${info.messageId}`);
            console.log(`📝 Response: ${info.response}`);
            return info;
        } catch (error: any) {
            console.error(`❌ Failed to send reset email to ${email}`);
            console.error(`Error details:`, error);
            if (error.code) {
                console.error(`Error code: ${error.code}`);
            }
            if (error.response) {
                console.error(`SMTP Response: ${error.response}`);
            }
            throw new Error("Failed to send password reset email. Please check server logs.");
        }
    }
}

export default MailService;
