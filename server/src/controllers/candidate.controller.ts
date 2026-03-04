import { Request, Response } from "express";
import CandidateService from "../services/candidate.service";
import { ApiResponse, asyncHandler } from "../utils";

/**
 * Candidate Controller — Single Responsibility
 * Handles HTTP request/response for candidate profile endpoints.
 */
class CandidateController {
    private candidateService: CandidateService;

    constructor(candidateService: CandidateService) {
        this.candidateService = candidateService;
    }

    /**
     * GET /api/candidates
     */
    getAll = asyncHandler(async (_req: Request, res: Response) => {
        const candidates = await this.candidateService.getAll();
        ApiResponse.success(res, candidates);
    });

    /**
     * GET /api/candidates/:userId
     */
    getByUserId = asyncHandler(async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId as string);
        const candidate = await this.candidateService.getByUserId(userId);

        if (!candidate) {
            return ApiResponse.notFound(res, "Candidate profile not found");
        }

        ApiResponse.success(res, candidate);
    });

    /**
     * PUT /api/candidates/:userId
     * Body varies by onboarding step (see candidate.service.ts)
     */
    update = asyncHandler(async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId as string);
        const candidate = await this.candidateService.update(userId, req.body);

        if (!candidate) {
            return ApiResponse.notFound(res, "Candidate profile not found");
        }

        ApiResponse.success(res, candidate, "Candidate profile updated successfully");
    });

    /**
     * DELETE /api/candidates/:userId
     */
    delete = asyncHandler(async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId as string);
        const deleted = await this.candidateService.delete(userId);

        if (!deleted) {
            return ApiResponse.notFound(res, "Candidate profile not found");
        }

        ApiResponse.success(res, null, "Candidate profile deleted");
    });
}

export default CandidateController;
