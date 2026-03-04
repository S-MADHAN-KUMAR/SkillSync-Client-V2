import { Response } from "express";

/**
 * Standardized API Response Utility — Single Responsibility
 * Ensures consistent response format across all endpoints.
 */
class ApiResponse {
    static success<T>(
        res: Response,
        data: T,
        message: string = "Success",
        statusCode: number = 200
    ): Response {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
            timestamp: new Date().toISOString(),
        });
    }

    static created<T>(
        res: Response,
        data: T,
        message: string = "Resource created successfully"
    ): Response {
        return this.success(res, data, message, 201);
    }

    static error(
        res: Response,
        message: string = "Internal Server Error",
        statusCode: number = 500,
        errors?: any
    ): Response {
        return res.status(statusCode).json({
            success: false,
            message,
            errors,
            timestamp: new Date().toISOString(),
        });
    }

    static notFound(
        res: Response,
        message: string = "Resource not found"
    ): Response {
        return this.error(res, message, 404);
    }

    static badRequest(
        res: Response,
        message: string = "Bad request",
        errors?: any
    ): Response {
        return this.error(res, message, 400, errors);
    }
}

export default ApiResponse;
