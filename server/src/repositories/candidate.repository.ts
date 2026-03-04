import { NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Candidate Repository — Single Responsibility
 * Handles ONLY database operations for the candidates table.
 */
class CandidateRepository {
    private sql: NeonQueryFunction<false, false>;

    constructor(sql: NeonQueryFunction<false, false>) {
        this.sql = sql;
    }

    async findAll() {
        const result = await this.sql`
      SELECT c.*, u.full_name, u.email, u.user_type 
      FROM candidates c 
      JOIN users u ON c.user_id = u.id 
      ORDER BY c.created_at DESC
    `;
        return result;
    }

    async findByUserId(userId: number) {
        const result = await this.sql`SELECT * FROM candidates WHERE user_id = ${userId}`;
        return result[0] || null;
    }

    async findById(id: number) {
        const result = await this.sql`SELECT * FROM candidates WHERE id = ${id}`;
        return result[0] || null;
    }

    async create(userId: number) {
        const result = await this.sql`
      INSERT INTO candidates (user_id) 
      VALUES (${userId})
      RETURNING *
    `;
        return result[0];
    }

    async update(userId: number, data: Record<string, any>) {
        // Check if candidate record exists, create if not
        let candidate = await this.findByUserId(userId);
        if (!candidate) {
            candidate = await this.create(userId);
        }

        const fields = Object.keys(data);
        if (fields.length === 0) return candidate;

        // For now, update each field individually using tagged templates
        // This is safer and compatible with new Neon API
        for (const field of fields) {
            const value = data[field];

            // Convert objects/arrays to JSONB
            const processedValue = (typeof value === "object" && value !== null)
                ? JSON.stringify(value)
                : value;

            // Update one field at a time
            if (field === "jobtitle") {
                await this.sql`UPDATE candidates SET jobtitle = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "coreskills") {
                await this.sql`UPDATE candidates SET coreskills = ${processedValue}::jsonb, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "resumecv") {
                await this.sql`UPDATE candidates SET resumecv = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "profileimage") {
                await this.sql`UPDATE candidates SET profileimage = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "bannerimage") {
                await this.sql`UPDATE candidates SET bannerimage = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "dob") {
                await this.sql`UPDATE candidates SET dob = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "gender") {
                await this.sql`UPDATE candidates SET gender = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "city") {
                await this.sql`UPDATE candidates SET city = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "state") {
                await this.sql`UPDATE candidates SET state = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "country") {
                await this.sql`UPDATE candidates SET country = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "pincode") {
                await this.sql`UPDATE candidates SET pincode = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "experiencestatus") {
                await this.sql`UPDATE candidates SET experiencestatus = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "totalexperience") {
                await this.sql`UPDATE candidates SET totalexperience = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "currentcompany") {
                await this.sql`UPDATE candidates SET currentcompany = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "expectedsalary") {
                await this.sql`UPDATE candidates SET expectedsalary = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "noticeperiod") {
                await this.sql`UPDATE candidates SET noticeperiod = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "workmode") {
                await this.sql`UPDATE candidates SET workmode = ${processedValue}::jsonb, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "education") {
                await this.sql`UPDATE candidates SET education = ${processedValue}::jsonb, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            }
        }

        // Return updated candidate
        const result = await this.findByUserId(userId);
        return result;
    }

    async delete(userId: number) {
        const result = await this.sql`DELETE FROM candidates WHERE user_id = ${userId} RETURNING *`;
        return result.length > 0;
    }
}

export default CandidateRepository;
