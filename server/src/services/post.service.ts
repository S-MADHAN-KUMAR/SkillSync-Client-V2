import { IPostService } from "../interfaces/service.interface";
import PostRepository from "../repositories/post.repository";
import { uploadMultipleImages } from "../utils/cloudinary.util";

/**
 * Post Service — Single Responsibility
 * Business logic for post operations
 */
export default class PostService implements IPostService {
    private postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    /**
     * Create a new post with images
     */
    async createPost(
        userId: number,
        title: string,
        description: string,
        images: string[]
    ): Promise<any> {
        // Upload images to Cloudinary
        let imageUrls: string[] = [];
        
        if (images && images.length > 0) {
            const uploadResults = await uploadMultipleImages(images, "posts");
            
            // Filter successful uploads
            imageUrls = uploadResults
                .filter((result: any) => result.success && result.url)
                .map((result: any) => result.url!);
        }

        // Create post in database
        const post = await this.postRepository.create(userId, title, description, imageUrls);
        return post;
    }

    /**
     * Get all posts
     */
    async getAllPosts(): Promise<any[]> {
        return await this.postRepository.getAll();
    }

    /**
     * Get posts by user ID
     */
    async getUserPosts(userId: number): Promise<any[]> {
        return await this.postRepository.getByUserId(userId);
    }

    /**
     * Get a single post by ID
     */
    async getPostById(postId: number): Promise<any> {
        return await this.postRepository.getById(postId);
    }

    /**
     * Delete a post
     */
    async deletePost(postId: number, userId: number): Promise<boolean> {
        return await this.postRepository.delete(postId, userId);
    }

    /**
     * Update a post
     */
    async updatePost(
        postId: number,
        userId: number,
        title: string,
        description: string,
        images: string[]
    ): Promise<any> {
        // Upload new images to Cloudinary
        let imageUrls: string[] = [];
        
        if (images && images.length > 0) {
            const uploadResults = await uploadMultipleImages(images, "posts");
            
            // Filter successful uploads
            imageUrls = uploadResults
                .filter((result: any) => result.success && result.url)
                .map((result: any) => result.url!);
        }

        return await this.postRepository.update(postId, userId, title, description, imageUrls);
    }
}
