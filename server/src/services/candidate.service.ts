import CandidateRepository from "../repositories/candidate.repository";
import { uploadResume, uploadImageFromBase64 } from "../utils/cloudinary.util";

/**
 * Candidate Service — Single Responsibility
 * Business logic for candidate profile management.
 */
class CandidateService {
    private candidateRepo: CandidateRepository;

    constructor(candidateRepo: CandidateRepository) {
        this.candidateRepo = candidateRepo;
    }

    /**
     * Get all candidates with user info
     */
    async getAll() {
        return this.candidateRepo.findAll();
    }

    /**
     * Get candidate by user ID
     */
    async getByUserId(userId: number) {
        return this.candidateRepo.findByUserId(userId);
    }

    /**
     * Update candidate profile
     * Handles step-by-step onboarding data from frontend
     * Step 1: { jobtitle, coreskills, resumecv }
     * Step 2: { profileimage, bannerimage, dob, gender, city, state, country, pincode }
     * Step 3: { experiencestatus, totalexperience, currentcompany, expectedsalary, noticeperiod, workmode }
     * Step 4: { education }
     */
    async update(userId: number, data: Record<string, any>) {
        const processedData = { ...data };

        // Upload resume to Cloudinary if provided
        if (data.resumecv && data.resumecv.startsWith("data:")) {
            const uploadResult = await uploadResume(data.resumecv, userId);
            if (uploadResult.success && uploadResult.url) {
                processedData.resumecv = uploadResult.url;
            } else {
                console.error("❌ Resume upload failed:", uploadResult.error);
                // Continue with the original data or throw error
            }
        }

        // Upload profile image to Cloudinary if provided
        if (data.profileimage && data.profileimage.startsWith("data:")) {
            const uploadResult = await uploadImageFromBase64(data.profileimage, "profiles");
            if (uploadResult.success && uploadResult.url) {
                processedData.profileimage = uploadResult.url;
            } else {
                console.error("❌ Profile image upload failed:", uploadResult.error);
            }
        }

        // Upload banner image to Cloudinary if provided
        if (data.bannerimage && data.bannerimage.startsWith("data:")) {
            const uploadResult = await uploadImageFromBase64(data.bannerimage, "banners");
            if (uploadResult.success && uploadResult.url) {
                processedData.bannerimage = uploadResult.url;
            } else {
                console.error("❌ Banner image upload failed:", uploadResult.error);
            }
        }

        return this.candidateRepo.update(userId, processedData);
    }

    /**
     * Delete candidate profile
     */
    async delete(userId: number) {
        return this.candidateRepo.delete(userId);
    }
}

export default CandidateService;
