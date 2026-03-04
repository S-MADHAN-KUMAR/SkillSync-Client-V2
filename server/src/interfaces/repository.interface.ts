/**
 * Generic Repository Interface — Interface Segregation Principle
 * Defines a contract for all CRUD repositories.
 * Concrete repositories implement only the methods they need.
 */
export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    create(data: Partial<T>): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}

/**
 * Post Repository Interface
 */
export interface IPostRepository {
    create(userId: number, title: string, description: string, images: string[]): Promise<any>;
    getAll(): Promise<any[]>;
    getByUserId(userId: number): Promise<any[]>;
    getById(postId: number): Promise<any>;
    delete(postId: number, userId: number): Promise<boolean>;
    update(postId: number, userId: number, title: string, description: string, images: string[]): Promise<any>;
}
