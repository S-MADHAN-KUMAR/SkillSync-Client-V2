import { Router } from "express";
import EmployerController from "../controllers/employer.controller";

/**
 * Employer Routes — maps HTTP endpoints to controller methods
 * 
 * GET    /api/employers          → Get all employers
 * GET    /api/employers/:userId  → Get employer by user ID
 * PUT    /api/employers/:userId  → Update employer profile
 * DELETE /api/employers/:userId  → Delete employer profile
 */
class EmployerRoutes {
    public router: Router;
    private employerController: EmployerController;

    constructor(employerController: EmployerController) {
        this.router = Router();
        this.employerController = employerController;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/", this.employerController.getAll);
        this.router.get("/:userId", this.employerController.getByUserId);
        this.router.put("/:userId", this.employerController.update);
        this.router.delete("/:userId", this.employerController.delete);
    }
}

export default EmployerRoutes;
