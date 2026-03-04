import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import envConfig from "../config/env.config";

/**
 * Database class — Single Responsibility Principle
 * Handles ONLY the Neon database connection lifecycle.
 */
class NeonDatabase {
    private static instance: NeonDatabase;
    private sql: NeonQueryFunction<false, false> | null = null;

    private constructor() { }

    /**
     * Singleton pattern ensures a single database connection instance
     */
    public static getInstance(): NeonDatabase {
        if (!NeonDatabase.instance) {
            NeonDatabase.instance = new NeonDatabase();
        }
        return NeonDatabase.instance;
    }

    /**
     * Initialize and return the Neon SQL client
     */
    public connect(): NeonQueryFunction<false, false> {
        if (!this.sql) {
            if (!envConfig.DATABASE_URL) {
                console.warn(
                    "⚠️  DATABASE_URL is not set. Database queries will fail."
                );
                console.warn(
                    "   Set it in your .env file with your Neon connection string."
                );
            }
            this.sql = neon(envConfig.DATABASE_URL);
            console.log("✅ Neon database client initialized");
        }
        return this.sql;
    }

    /**
     * Get the SQL client (must call connect() first)
     */
    public getClient(): NeonQueryFunction<false, false> {
        if (!this.sql) {
            return this.connect();
        }
        return this.sql;
    }
}

export default NeonDatabase;
