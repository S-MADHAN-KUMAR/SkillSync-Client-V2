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
        const allowedOrigins = [
            "http://localhost:3000",  // Next.js default
            "http://localhost:4000",  // Alternative port
            envConfig.CORS_ORIGIN,    // Custom from .env
        ].filter(Boolean);

        this.app.use(
            cors({
                origin: (origin, callback) => {
                    // Allow requests with no origin (like mobile apps, Postman, curl)
                    if (!origin) return callback(null, true);
                    
                    if (allowedOrigins.includes(origin)) {
                        callback(null, true);
                    } else {
                        console.warn(`⚠️  CORS blocked request from origin: ${origin}`);
                        callback(new Error("Not allowed by CORS"));
                    }
                },
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
