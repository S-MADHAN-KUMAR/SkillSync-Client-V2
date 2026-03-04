import { Router } from "express";
import { HealthController } from "../controllers";

/**
 * Health Routes — Open/Closed Principle
 * Open for extension (add new routes), closed for modification.
 * Controller is injected via constructor (DI).
 */
class HealthRoutes {
    public router: Router;
    private healthController: HealthController;

    constructor(healthController: HealthController) {
        this.router = Router();
        this.healthController = healthController;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/", this.healthController.getHealth);
    }
}

export default HealthRoutes;
