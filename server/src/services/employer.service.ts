import EmployerRepository from "../repositories/employer.repository";

/**
 * Employer Service — Single Responsibility
 * Business logic for employer profile management.
 */
class EmployerService {
    private employerRepo: EmployerRepository;

    constructor(employerRepo: EmployerRepository) {
        this.employerRepo = employerRepo;
    }

    /**
     * Get all employers with user info
     */
    async getAll() {
        return this.employerRepo.findAll();
    }

    /**
     * Get employer by user ID
     */
    async getByUserId(userId: number) {
        return this.employerRepo.findByUserId(userId);
    }

    /**
     * Update employer profile
     * Handles step-by-step onboarding data from frontend
     * Step 1: { companyname, brandname, industry, companylogo, companybanner }
     * Step 2: { companytype, companysize, foundedyear, website }
     * Step 3: { country, state, city, pincode, location, ispublic }
     */
    async update(userId: number, data: Record<string, any>) {
        return this.employerRepo.update(userId, data);
    }

    /**
     * Delete employer profile
     */
    async delete(userId: number) {
        return this.employerRepo.delete(userId);
    }
}

export default EmployerService;
