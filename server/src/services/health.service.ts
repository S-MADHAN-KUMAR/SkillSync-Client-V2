import { HealthRepository } from "../repositories";

/**
 * Health Service — Single Responsibility + Dependency Inversion
 * Business logic for health checks.
 * Depends on HealthRepository (injected), not on a concrete DB client.
 */
class HealthService {
    private healthRepository: HealthRepository;

    // ── Dependency Injection: repository injected via constructor ──
    constructor(healthRepository: HealthRepository) {
        this.healthRepository = healthRepository;
    }

    /**
     * Returns overall server + database health
     */
    async getHealthStatus() {
        const dbHealth = await this.healthRepository.checkDatabaseHealth();

        return {
            server: {
                status: "healthy",
                uptime: process.uptime(),
                memoryUsage: process.memoryUsage().rss,
                nodeVersion: process.version,
            },
            database: dbHealth,
        };
    }
}

export default HealthService;
