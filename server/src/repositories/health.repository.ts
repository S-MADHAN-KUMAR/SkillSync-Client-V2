import { NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Health Repository — Single Responsibility Principle
 * Only responsible for database-level health check queries.
 */
class HealthRepository {
    private sql: NeonQueryFunction<false, false>;

    // ── Dependency Injection: database client injected via constructor ──
    constructor(sql: NeonQueryFunction<false, false>) {
        this.sql = sql;
    }

    /**
     * Runs a simple query to verify database connectivity
     */
    async checkDatabaseHealth(): Promise<{ connected: boolean; timestamp: string }> {
        try {
            const result = await this.sql`SELECT NOW() as current_time`;
            return {
                connected: true,
                timestamp: result[0]?.current_time || new Date().toISOString(),
            };
        } catch (error) {
            return {
                connected: false,
                timestamp: new Date().toISOString(),
            };
        }
    }
}

export default HealthRepository;
