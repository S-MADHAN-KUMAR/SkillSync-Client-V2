import NeonDatabase from "../database/neon.database";
import { HealthRepository } from "../repositories";
import { HealthService } from "../services";
import { HealthController } from "../controllers";
import HealthRoutes from "../routes/health.routes";

/**
 * Dependency Injection Container
 * ────────────────────────────────────────────────────────
 * Central place where ALL dependencies are wired together.
 *
 * SOLID Principles applied:
 * - SRP: Each class has a single responsibility
 * - OCP: New features are added by creating new modules, not modifying existing ones
 * - LSP: Concrete implementations can be swapped via interfaces
 * - ISP: Interfaces are small and focused
 * - DIP: High-level modules depend on abstractions (interfaces), not concretions
 *
 * Dependency flow:
 *   Database → Repository → Service → Controller → Routes
 */
class DIContainer {
    private static instance: DIContainer;

    // ── Singleton instances ─────────────────────────────
    private database: NeonDatabase;
    private healthRepository!: HealthRepository;
    private healthService!: HealthService;
    private healthController!: HealthController;
    private healthRoutes!: HealthRoutes;

    private constructor() {
        this.database = NeonDatabase.getInstance();
        this.initializeDependencies();
    }

    public static getInstance(): DIContainer {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer();
        }
        return DIContainer.instance;
    }

    /**
     * Wire all dependencies in correct order:
     * DB Client → Repositories → Services → Controllers → Routes
     */
    private initializeDependencies(): void {
        const sql = this.database.connect();

        // ── Layer 1: Repositories (depend on DB) ──────────
        this.healthRepository = new HealthRepository(sql);

        // ── Layer 2: Services (depend on Repositories) ────
        this.healthService = new HealthService(this.healthRepository);

        // ── Layer 3: Controllers (depend on Services) ─────
        this.healthController = new HealthController(this.healthService);

        // ── Layer 4: Routes (depend on Controllers) ───────
        this.healthRoutes = new HealthRoutes(this.healthController);
    }

    // ── Getters for route modules ───────────────────────
    public getHealthRoutes(): HealthRoutes {
        return this.healthRoutes;
    }

    // Add more getters as you add features:
    // public getUserRoutes(): UserRoutes { return this.userRoutes; }
}

// Export a singleton instance
export const container = DIContainer.getInstance();
