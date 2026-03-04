import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils";

/**
 * 404 Not Found Middleware
 * Catches requests to undefined routes.
 */
const notFoundHandler = (
    req: Request,
    res: Response,
    _next: NextFunction
): void => {
    ApiResponse.notFound(res, `Route ${req.method} ${req.originalUrl} not found`);
};

export default notFoundHandler;
