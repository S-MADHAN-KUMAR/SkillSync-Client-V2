import { Request, Response } from "express";
import PostService from "../services/post.service";
import asyncHandler from "../utils/async-handler.util";
import ApiResponse from "../utils/api-response.util";

/**
 * Post Controller — Single Responsibility
 * Handles HTTP request/response for post endpoints
 */
export default class PostController {
    private postService: PostService;

    constructor(postService: PostService) {
        this.postService = postService;
    }

    /**
     * Create a new post
     * POST /api/posts
     * Body: { userId, title, description, images: string[] }
     */
    createPost = asyncHandler(async (req: Request, res: Response) => {
        const { userId, title, description, images } = req.body;

        if (!userId || !title || !description) {
            return ApiResponse.error(
                res,
                "Missing required fields: userId, title, description",
                400
            );
        }

        const post = await this.postService.createPost(userId, title, description, images || []);

        return ApiResponse.created(res, post, "Post created successfully");
    });

    /**
     * Get all posts
     * GET /api/posts
     */
    getAllPosts = asyncHandler(async (req: Request, res: Response) => {
        const posts = await this.postService.getAllPosts();

        return ApiResponse.success(res, posts, "Posts retrieved successfully");
    });

    /**
     * Get posts by user ID
     * GET /api/posts/user/:userId
     */
    getUserPosts = asyncHandler(async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId as string);

        if (!userId) {
            return ApiResponse.error(res, "Invalid user ID", 400);
        }

        const posts = await this.postService.getUserPosts(userId);

        return ApiResponse.success(res, posts, "User posts retrieved successfully");
    });

    /**
     * Get a single post by ID
     * GET /api/posts/:postId
     */
    getPostById = asyncHandler(async (req: Request, res: Response) => {
        const postId = parseInt(req.params.postId as string);

        if (!postId) {
            return ApiResponse.error(res, "Invalid post ID", 400);
        }

        const post = await this.postService.getPostById(postId);

        if (!post) {
            return ApiResponse.notFound(res, "Post not found");
        }

        return ApiResponse.success(res, post, "Post retrieved successfully");
    });

    /**
     * Delete a post
     * DELETE /api/posts/:postId
     * Body: { userId }
     */
    deletePost = asyncHandler(async (req: Request, res: Response) => {
        const postId = parseInt(req.params.postId as string);
        const { userId } = req.body;

        if (!postId || !userId) {
            return ApiResponse.error(
                res,
                "Missing required fields: postId, userId",
                400
            );
        }

        const deleted = await this.postService.deletePost(postId, userId);

        if (!deleted) {
            return ApiResponse.error(
                res,
                "Post not found or you don't have permission to delete it",
                404
            );
        }

        return ApiResponse.success(res, { deleted: true }, "Post deleted successfully");
    });

    /**
     * Update a post
     * PUT /api/posts/:postId
     * Body: { userId, title, description, images: string[] }
     */
    updatePost = asyncHandler(async (req: Request, res: Response) => {
        const postId = parseInt(req.params.postId as string);
        const { userId, title, description, images } = req.body;

        if (!postId || !userId || !title || !description) {
            return ApiResponse.error(
                res,
                "Missing required fields: postId, userId, title, description",
                400
            );
        }

        const updatedPost = await this.postService.updatePost(
            postId,
            userId,
            title,
            description,
            images || []
        );

        if (!updatedPost) {
            return ApiResponse.error(
                res,
                "Post not found or you don't have permission to update it",
                404
            );
        }

        return ApiResponse.success(res, updatedPost, "Post updated successfully");
    });
}
