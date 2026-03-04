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
