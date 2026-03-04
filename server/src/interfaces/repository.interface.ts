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
