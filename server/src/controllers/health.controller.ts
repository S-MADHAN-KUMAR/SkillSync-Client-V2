import { Request, Response } from "express";
import { HealthService } from "../services";
import { ApiResponse, asyncHandler } from "../utils";

/**
 * Health Controller — Single Responsibility
 * Handles ONLY health-check related HTTP requests.
 * Depends on HealthService abstraction (injected via constructor).
 */
class HealthController {
    private healthService: HealthService;

    // ── Dependency Injection: service injected via constructor ──
    constructor(healthService: HealthService) {
        this.healthService = healthService;
    }

    /**
     * GET /api/health
     */
    getHealth = asyncHandler(async (_req: Request, res: Response) => {
        const health = await this.healthService.getHealthStatus();
        ApiResponse.success(res, health, "Server is running");
    });
}

export default HealthController;
