import NeonDatabase from "../database/neon.database";

// ── Repositories ──────────────────────────────────────
import { HealthRepository } from "../repositories";
import UserRepository from "../repositories/user.repository";
import CandidateRepository from "../repositories/candidate.repository";
import EmployerRepository from "../repositories/employer.repository";
import PostRepository from "../repositories/post.repository";

// ── Services ──────────────────────────────────────────
import { HealthService } from "../services";
import UserService from "../services/user.service";
import CandidateService from "../services/candidate.service";
import EmployerService from "../services/employer.service";
import MailService from "../services/mail.service";
import PostService from "../services/post.service";

// ── Controllers ───────────────────────────────────────
import { HealthController } from "../controllers";
import UserController from "../controllers/user.controller";
import CandidateController from "../controllers/candidate.controller";
import EmployerController from "../controllers/employer.controller";
import PostController from "../controllers/post.controller";

// ── Routes ────────────────────────────────────────────
import HealthRoutes from "../routes/health.routes";
import UserRoutes from "../routes/user.routes";
import CandidateRoutes from "../routes/candidate.routes";
import EmployerRoutes from "../routes/employer.routes";
import PostRoutes from "../routes/post.routes";

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
    private mailService: MailService;

    // Health
    private healthRepository!: HealthRepository;
    private healthService!: HealthService;
    private healthController!: HealthController;
    private healthRoutes!: HealthRoutes;

    // Users
    private userRepository!: UserRepository;
    private userService!: UserService;
    private userController!: UserController;
    private userRoutes!: UserRoutes;

    // Candidates
    private candidateRepository!: CandidateRepository;
    private candidateService!: CandidateService;
    private candidateController!: CandidateController;
    private candidateRoutes!: CandidateRoutes;

    // Employers
    private employerRepository!: EmployerRepository;
    private employerService!: EmployerService;
    private employerController!: EmployerController;
    private employerRoutes!: EmployerRoutes;

    // Posts
    private postRepository!: PostRepository;
    private postService!: PostService;
    private postController!: PostController;
    private postRoutes!: PostRoutes;

    private constructor() {
        this.database = NeonDatabase.getInstance();
        this.mailService = new MailService();
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

        // ══════════════════════════════════════════════════
        // Layer 1: Repositories (depend on DB)
        // ══════════════════════════════════════════════════
        this.healthRepository = new HealthRepository(sql);
        this.userRepository = new UserRepository(sql);
        this.candidateRepository = new CandidateRepository(sql);
        this.employerRepository = new EmployerRepository(sql);
        this.postRepository = new PostRepository(sql);

        // ══════════════════════════════════════════════════
        // Layer 2: Services (depend on Repositories)
        // ══════════════════════════════════════════════════
        this.healthService = new HealthService(this.healthRepository);
        this.userService = new UserService(
            this.userRepository,
            this.candidateRepository,
            this.employerRepository,
            this.mailService
        );
        this.candidateService = new CandidateService(this.candidateRepository);
        this.employerService = new EmployerService(this.employerRepository);
        this.postService = new PostService(this.postRepository);

        // ══════════════════════════════════════════════════
        // Layer 3: Controllers (depend on Services)
        // ══════════════════════════════════════════════════
        this.healthController = new HealthController(this.healthService);
        this.userController = new UserController(this.userService);
        this.candidateController = new CandidateController(this.candidateService);
        this.employerController = new EmployerController(this.employerService);
        this.postController = new PostController(this.postService);

        // ══════════════════════════════════════════════════
        // Layer 4: Routes (depend on Controllers)
        // ══════════════════════════════════════════════════
        this.healthRoutes = new HealthRoutes(this.healthController);
        this.userRoutes = new UserRoutes(this.userController);
        this.candidateRoutes = new CandidateRoutes(this.candidateController);
        this.employerRoutes = new EmployerRoutes(this.employerController);
        this.postRoutes = new PostRoutes(this.postController);
    }

    // ── Route Getters ───────────────────────────────────
    public getHealthRoutes(): HealthRoutes {
        return this.healthRoutes;
    }

    public getUserRoutes(): UserRoutes {
        return this.userRoutes;
    }

    public getCandidateRoutes(): CandidateRoutes {
        return this.candidateRoutes;
    }

    public getEmployerRoutes(): EmployerRoutes {
        return this.employerRoutes;
    }

    public getPostRoutes(): PostRoutes {
        return this.postRoutes;
    }
}

// Export a singleton instance
export const container = DIContainer.getInstance();
