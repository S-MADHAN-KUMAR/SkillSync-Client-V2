/**
 * Generic Service Interface — Dependency Inversion Principle
 * High-level modules (controllers) depend on this abstraction,
 * not on concrete service implementations.
 */
export interface IService<T> {
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T | null>;
    create(data: Partial<T>): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    remove(id: string): Promise<boolean>;
}

/**
 * Post Service Interface
 */
export interface IPostService {
    createPost(userId: number, title: string, description: string, images: string[]): Promise<any>;
    getAllPosts(): Promise<any[]>;
    getUserPosts(userId: number): Promise<any[]>;
    getPostById(postId: number): Promise<any>;
    deletePost(postId: number, userId: number): Promise<boolean>;
    updatePost(postId: number, userId: number, title: string, description: string, images: string[]): Promise<any>;
}
