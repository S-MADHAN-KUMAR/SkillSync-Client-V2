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

// ── Add more routes below ─────────────────────────────
// Example:
// const userRoutes = container.getUserRoutes();
// rootRouter.use("/users", userRoutes.router);

export default rootRouter;
