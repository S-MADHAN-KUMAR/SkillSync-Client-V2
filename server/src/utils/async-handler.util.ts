import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Async Handler Wrapper — avoids try/catch in every controller
 * Catches async errors and forwards them to the error middleware.
 */
const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export default asyncHandler;
