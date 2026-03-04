import { NeonQueryFunction } from "@neondatabase/serverless";

/**
 * User Repository — Single Responsibility
 * Handles ONLY database operations for the users table.
 */
class UserRepository {
    private sql: NeonQueryFunction<false, false>;

    constructor(sql: NeonQueryFunction<false, false>) {
        this.sql = sql;
    }

    async findAll() {
        const result = await this.sql`SELECT * FROM users ORDER BY created_at DESC`;
        return result;
    }

    async findById(id: number) {
        const result = await this.sql`SELECT * FROM users WHERE id = ${id}`;
        return result[0] || null;
    }

    async findByEmail(email: string) {
        const result = await this.sql`SELECT * FROM users WHERE email = ${email}`;
        return result[0] || null;
    }

    async create(data: {
        full_name: string;
        email: string;
        mobile_number?: string;
        password: string;
        user_type: string;
        otp?: string;
        otp_expires_at?: string;
    }) {
        const result = await this.sql`
      INSERT INTO users (full_name, email, mobile_number, password, user_type, otp, otp_expires_at)
      VALUES (
        ${data.full_name},
        ${data.email},
        ${data.mobile_number || null},
        ${data.password},
        ${data.user_type},
        ${data.otp || null},
        ${data.otp_expires_at || null}
      )
      RETURNING *
    `;
        return result[0];
    }

    async update(id: number, data: Record<string, any>) {
        const fields = Object.keys(data);
        if (fields.length === 0) return this.findById(id);

        // Update each field individually using tagged templates
        for (const field of fields) {
            const value = data[field];
            
            if (field === "password") {
                await this.sql`UPDATE users SET password = ${value}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`;
            } else if (field === "full_name") {
                await this.sql`UPDATE users SET full_name = ${value}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`;
            } else if (field === "mobile_number") {
                await this.sql`UPDATE users SET mobile_number = ${value}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`;
            } else if (field === "is_onboarded") {
                await this.sql`UPDATE users SET is_onboarded = ${value}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`;
            } else if (field === "is_verified") {
                await this.sql`UPDATE users SET is_verified = ${value}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`;
            } else if (field === "otp") {
                await this.sql`UPDATE users SET otp = ${value}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`;
            } else if (field === "otp_expires_at") {
                await this.sql`UPDATE users SET otp_expires_at = ${value}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`;
            }
        }

        const result = await this.findById(id);
        return result;
    }

    async updateOtp(id: number, otp: string, expiresAt: Date) {
        const result = await this.sql`
      UPDATE users 
      SET otp = ${otp}, otp_expires_at = ${expiresAt.toISOString()}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
        return result[0] || null;
    }

    async verifyUser(email: string) {
        const result = await this.sql`
      UPDATE users 
      SET is_verified = true, otp = NULL, otp_expires_at = NULL, updated_at = CURRENT_TIMESTAMP
      WHERE email = ${email}
      RETURNING *
    `;
        return result[0] || null;
    }

    async updateOnboardedStatus(id: number, isOnboarded: boolean) {
        const result = await this.sql`
      UPDATE users 
      SET is_onboarded = ${isOnboarded}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
        return result[0] || null;
    }

    async delete(id: number) {
        const result = await this.sql`DELETE FROM users WHERE id = ${id} RETURNING *`;
        return result.length > 0;
    }
}

export default UserRepository;
