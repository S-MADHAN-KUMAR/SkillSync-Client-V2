import { Request, Response } from "express";
import EmployerService from "../services/employer.service";
import { ApiResponse, asyncHandler } from "../utils";

/**
 * Employer Controller — Single Responsibility
 * Handles HTTP request/response for employer profile endpoints.
 */
class EmployerController {
    private employerService: EmployerService;

    constructor(employerService: EmployerService) {
        this.employerService = employerService;
    }

    /**
     * GET /api/employers
     */
    getAll = asyncHandler(async (_req: Request, res: Response) => {
        const employers = await this.employerService.getAll();
        ApiResponse.success(res, employers);
    });

    /**
     * GET /api/employers/:userId
     */
    getByUserId = asyncHandler(async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId as string);
        const employer = await this.employerService.getByUserId(userId);

        if (!employer) {
            return ApiResponse.notFound(res, "Employer profile not found");
        }

        ApiResponse.success(res, employer);
    });

    /**
     * PUT /api/employers/:userId
     * Body varies by onboarding step (see employer.service.ts)
     */
    update = asyncHandler(async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId as string);
        const employer = await this.employerService.update(userId, req.body);

        if (!employer) {
            return ApiResponse.notFound(res, "Employer profile not found");
        }

        ApiResponse.success(res, employer, "Employer profile updated successfully");
    });

    /**
     * DELETE /api/employers/:userId
     */
    delete = asyncHandler(async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId as string);
        const deleted = await this.employerService.delete(userId);

        if (!deleted) {
            return ApiResponse.notFound(res, "Employer profile not found");
        }

        ApiResponse.success(res, null, "Employer profile deleted");
    });
}

export default EmployerController;
