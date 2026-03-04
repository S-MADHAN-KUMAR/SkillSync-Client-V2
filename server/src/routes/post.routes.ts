import { Router } from "express";
import PostController from "../controllers/post.controller";

/**
 * Post Routes — maps HTTP endpoints to controller methods
 * 
 * POST   /api/posts                → Create a new post
 * GET    /api/posts                → Get all posts
 * GET    /api/posts/user/:userId   → Get posts by user ID
 * GET    /api/posts/:postId        → Get a single post by ID
 * PUT    /api/posts/:postId        → Update a post
 * DELETE /api/posts/:postId        → Delete a post
 */
class PostRoutes {
    public router: Router;
    private postController: PostController;

    constructor(postController: PostController) {
        this.router = Router();
        this.postController = postController;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/", this.postController.createPost);
        this.router.get("/", this.postController.getAllPosts);
        this.router.get("/user/:userId", this.postController.getUserPosts);
        this.router.get("/:postId", this.postController.getPostById);
        this.router.put("/:postId", this.postController.updatePost);
        this.router.delete("/:postId", this.postController.deletePost);
    }
}

export default PostRoutes;
