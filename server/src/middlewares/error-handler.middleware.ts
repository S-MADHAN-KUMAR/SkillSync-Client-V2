import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils";

/**
 * Global Error Handling Middleware — Single Responsibility
 * Catches all unhandled errors and returns a standardized response.
 * Maps known error messages to appropriate HTTP status codes.
 */
const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    console.error("❌ Error:", err.message);

    // Map known service errors to HTTP status codes
    const errorMap: Record<string, number> = {
        "User with this email already exists": 409,
        "Invalid email or password": 401,
        "Please verify your email before logging in": 403,
        "User not found": 404,
        "User is already verified": 400,
        "Invalid OTP": 400,
        "OTP has expired. Please request a new one": 400,
        "Invalid or expired reset code": 400,
        "Reset code has expired": 400,
    };

    const statusCode = errorMap[err.message] || 500;

    ApiResponse.error(
        res,
        process.env.NODE_ENV === "production" && statusCode === 500
            ? "Internal Server Error"
            : err.message,
        statusCode
    );
};

export default errorHandler;
