import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import envConfig from "./config/env.config";
import rootRouter from "./routes";
import { errorHandler, notFoundHandler } from "./middlewares";

/**
 * App Class — Single Responsibility
 * Responsible ONLY for Express app configuration and middleware setup.
 */
class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    /**
     * Register global middlewares
     */
    private initializeMiddlewares(): void {
        // ── CORS ──────────────────────────────────────────
        this.app.use(
            cors({
                origin: envConfig.CORS_ORIGIN,
                credentials: true,
                methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
                allowedHeaders: ["Content-Type", "Authorization"],
            })
        );

        // ── Body Parsing ──────────────────────────────────
        this.app.use(express.json({ limit: "10mb" }));
        this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));

        // ── Morgan — API Call Logging in Terminal ──────────
        this.app.use(
            morgan("dev", {
                skip: (_req, res) => res.statusCode < 400,
                stream: { write: (msg) => console.log(`🔴 ${msg.trim()}`) },
            })
        );
        this.app.use(
            morgan("dev", {
                skip: (_req, res) => res.statusCode >= 400,
                stream: { write: (msg) => console.log(`🟢 ${msg.trim()}`) },
            })
        );
    }

    /**
     * Register API routes
     */
    private initializeRoutes(): void {
        // ── Root endpoint ─────────────────────────────────
        this.app.get("/", (_req, res) => {
            res.json({
                message: "🚀 SkillSync API Server",
                version: "1.0.0",
                docs: "/api/health",
            });
        });

        // ── API Routes ────────────────────────────────────
        this.app.use("/api", rootRouter);
    }

    /**
     * Register error-handling middlewares (must be last)
     */
    private initializeErrorHandling(): void {
        this.app.use(notFoundHandler);
        this.app.use(errorHandler);
    }
}

export default new App().app;
