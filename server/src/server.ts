import app from "./app";
import envConfig from "./config/env.config";

/**
 * Server Entry Point
 * Starts the Express server and handles graceful shutdown.
 */
const startServer = (): void => {
    const { PORT, NODE_ENV } = envConfig;

    const server = app.listen(PORT, () => {
        console.log(`\n╔══════════════════════════════════════════════════╗`);
        console.log(`║                                                  ║`);
        console.log(`║   🚀  SkillSync API Server                       ║`);
        console.log(`║                                                  ║`);
        console.log(`║   ➤ Port:         ${String(PORT).padEnd(30)}║`);
        console.log(`║   ➤ Environment:  ${NODE_ENV.padEnd(30)}║`);
        console.log(`║   ➤ Health:       http://localhost:${PORT}/api/health  ║`);
        console.log(`║                                                  ║`);
        console.log(`╚══════════════════════════════════════════════════╝\n`);
    });

    // ── Graceful Shutdown ───────────────────────────────
    const shutdown = (signal: string) => {
        console.log(`\n⚡ ${signal} received. Shutting down gracefully...`);
        server.close(() => {
            console.log("✅ Server closed.");
            process.exit(0);
        });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
};

startServer();
