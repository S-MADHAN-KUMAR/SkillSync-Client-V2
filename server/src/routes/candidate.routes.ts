import { Router } from "express";
import CandidateController from "../controllers/candidate.controller";

/**
 * Candidate Routes — maps HTTP endpoints to controller methods
 * 
 * GET    /api/candidates          → Get all candidates
 * GET    /api/candidates/:userId  → Get candidate by user ID
 * PUT    /api/candidates/:userId  → Update candidate profile
 * DELETE /api/candidates/:userId  → Delete candidate profile
 */
class CandidateRoutes {
    public router: Router;
    private candidateController: CandidateController;

    constructor(candidateController: CandidateController) {
        this.router = Router();
        this.candidateController = candidateController;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/", this.candidateController.getAll);
        this.router.get("/:userId", this.candidateController.getByUserId);
        this.router.put("/:userId", this.candidateController.update);
        this.router.delete("/:userId", this.candidateController.delete);
    }
}

export default CandidateRoutes;
