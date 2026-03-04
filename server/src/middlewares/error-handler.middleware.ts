import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils";

/**
 * Global Error Handling Middleware — Single Responsibility
 * Catches all unhandled errors and returns a standardized response.
 */
const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    console.error("❌ Error:", err.message);
    console.error(err.stack);

    ApiResponse.error(
        res,
        process.env.NODE_ENV === "production"
            ? "Internal Server Error"
            : err.message,
        500
    );
};

export default errorHandler;
