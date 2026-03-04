import { NeonQueryFunction } from "@neondatabase/serverless";
import { IPostRepository } from "../interfaces/repository.interface";

/**
 * Post Repository — Single Responsibility
 * Handles ONLY database operations for the posts table
 */
export default class PostRepository implements IPostRepository {
    private sql: NeonQueryFunction<false, false>;

    constructor(sql: NeonQueryFunction<false, false>) {
        this.sql = sql;
    }

    /**
     * Create a new post
     */
    async create(userId: number, title: string, description: string, images: string[]): Promise<any> {
        const result = await this.sql`
            INSERT INTO posts (user_id, title, description, images)
            VALUES (${userId}, ${title}, ${description}, ${JSON.stringify(images)})
            RETURNING *
        `;
        return result[0];
    }

    /**
     * Get all posts with user information
     */
    async getAll(): Promise<any[]> {
        const result = await this.sql`
            SELECT 
                p.*,
                u.full_name,
                u.user_type,
                c.profileimage as user_image
            FROM posts p
            JOIN users u ON p.user_id = u.id
            LEFT JOIN candidates c ON u.id = c.user_id
            ORDER BY p.created_at DESC
        `;
        return result;
    }

    /**
     * Get posts by user ID
     */
    async getByUserId(userId: number): Promise<any[]> {
        const result = await this.sql`
            SELECT 
                p.*,
                u.full_name,
                u.user_type,
                c.profileimage as user_image
            FROM posts p
            JOIN users u ON p.user_id = u.id
            LEFT JOIN candidates c ON u.id = c.user_id
            WHERE p.user_id = ${userId}
            ORDER BY p.created_at DESC
        `;
        return result;
    }

    /**
     * Get a single post by ID
     */
    async getById(postId: number): Promise<any> {
        const result = await this.sql`
            SELECT 
                p.*,
                u.full_name,
                u.user_type,
                c.profileimage as user_image
            FROM posts p
            JOIN users u ON p.user_id = u.id
            LEFT JOIN candidates c ON u.id = c.user_id
            WHERE p.id = ${postId}
        `;
        return result[0];
    }

    /**
     * Delete a post
     */
    async delete(postId: number, userId: number): Promise<boolean> {
        const result = await this.sql`
            DELETE FROM posts 
            WHERE id = ${postId} AND user_id = ${userId}
            RETURNING id
        `;
        return result.length > 0;
    }

    /**
     * Update a post
     */
    async update(
        postId: number,
        userId: number,
        title: string,
        description: string,
        images: string[]
    ): Promise<any> {
        const result = await this.sql`
            UPDATE posts 
            SET 
                title = ${title},
                description = ${description},
                images = ${JSON.stringify(images)},
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ${postId} AND user_id = ${userId}
            RETURNING *
        `;
        return result[0];
    }
}
