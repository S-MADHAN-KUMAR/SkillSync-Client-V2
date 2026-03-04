import { NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Employer Repository — Single Responsibility
 * Handles ONLY database operations for the employers table.
 */
class EmployerRepository {
    private sql: NeonQueryFunction<false, false>;

    constructor(sql: NeonQueryFunction<false, false>) {
        this.sql = sql;
    }

    async findAll() {
        const result = await this.sql`
      SELECT e.*, u.full_name, u.email, u.user_type 
      FROM employers e 
      JOIN users u ON e.user_id = u.id 
      ORDER BY e.created_at DESC
    `;
        return result;
    }

    async findByUserId(userId: number) {
        const result = await this.sql`SELECT * FROM employers WHERE user_id = ${userId}`;
        return result[0] || null;
    }

    async findById(id: number) {
        const result = await this.sql`SELECT * FROM employers WHERE id = ${id}`;
        return result[0] || null;
    }

    async create(userId: number) {
        const result = await this.sql`
      INSERT INTO employers (user_id)
      VALUES (${userId})
      RETURNING *
    `;
        return result[0];
    }

    async update(userId: number, data: Record<string, any>) {
        // Check if employer record exists, create if not
        let employer = await this.findByUserId(userId);
        if (!employer) {
            employer = await this.create(userId);
        }

        const fields = Object.keys(data);
        if (fields.length === 0) return employer;

        // Update each field individually using tagged templates
        for (const field of fields) {
            const value = data[field];
            const processedValue = (typeof value === "object" && value !== null) 
                ? JSON.stringify(value) 
                : value;

            if (field === "companyname") {
                await this.sql`UPDATE employers SET companyname = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "brandname") {
                await this.sql`UPDATE employers SET brandname = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "companylogo") {
                await this.sql`UPDATE employers SET companylogo = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "companybanner") {
                await this.sql`UPDATE employers SET companybanner = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "industry") {
                await this.sql`UPDATE employers SET industry = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "companytype") {
                await this.sql`UPDATE employers SET companytype = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "companysize") {
                await this.sql`UPDATE employers SET companysize = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "foundedyear") {
                await this.sql`UPDATE employers SET foundedyear = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "website") {
                await this.sql`UPDATE employers SET website = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "city") {
                await this.sql`UPDATE employers SET city = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "state") {
                await this.sql`UPDATE employers SET state = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "country") {
                await this.sql`UPDATE employers SET country = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "pincode") {
                await this.sql`UPDATE employers SET pincode = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "location") {
                await this.sql`UPDATE employers SET location = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            } else if (field === "ispublic") {
                await this.sql`UPDATE employers SET ispublic = ${processedValue}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ${userId}`;
            }
        }

        const result = await this.findByUserId(userId);
        return result;
    }

    async delete(userId: number) {
        const result = await this.sql`DELETE FROM employers WHERE user_id = ${userId} RETURNING *`;
        return result.length > 0;
    }
}

export default EmployerRepository;
