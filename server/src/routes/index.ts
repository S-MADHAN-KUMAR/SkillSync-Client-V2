import { Router } from "express";
import { container } from "../di/container";

/**
 * Root Router — aggregates all sub-route modules.
 * Add new feature routes here following the same pattern.
 */
const rootRouter = Router();

// ── Health Routes ─────────────────────────────────────
const healthRoutes = container.getHealthRoutes();
rootRouter.use("/health", healthRoutes.router);

// ── User / Auth Routes ────────────────────────────────
const userRoutes = container.getUserRoutes();
rootRouter.use("/users", userRoutes.router);

// ── Candidate Routes ──────────────────────────────────
const candidateRoutes = container.getCandidateRoutes();
rootRouter.use("/candidates", candidateRoutes.router);

// ── Employer Routes ───────────────────────────────────
const employerRoutes = container.getEmployerRoutes();
rootRouter.use("/employers", employerRoutes.router);

// ── Post Routes ───────────────────────────────────────
const postRoutes = container.getPostRoutes();
rootRouter.use("/posts", postRoutes.router);

export default rootRouter;
