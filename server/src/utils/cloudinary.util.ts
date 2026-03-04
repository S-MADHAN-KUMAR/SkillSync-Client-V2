import cloudinary from "../config/cloudinary.config";
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

/**
 * Cloudinary Upload Utilities
 * ─────────────────────────────────────────────────────
 * Helper functions for uploading images and files to Cloudinary
 */

interface CloudinaryUploadResult {
    success: boolean;
    url?: string;
    publicId?: string;
    error?: string;
}

/**
 * Upload image from base64 string
 * @param base64String - Base64 encoded image string (with or without data:image prefix)
 * @param folder - Folder name in Cloudinary (e.g., 'posts', 'resumes', 'profiles')
 * @returns Upload result with URL and public ID
 */
export async function uploadImageFromBase64(
    base64String: string,
    folder: string = "uploads"
): Promise<CloudinaryUploadResult> {
    try {
        const result: UploadApiResponse = await cloudinary.uploader.upload(base64String, {
            folder: `skillsync/${folder}`,
            resource_type: "auto",
        });

        return {
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
        };
    } catch (error) {
        console.error("❌ Cloudinary upload error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Upload failed",
        };
    }
}

/**
 * Upload multiple images from base64 strings
 * @param base64Strings - Array of base64 encoded images
 * @param folder - Folder name in Cloudinary
 * @returns Array of upload results
 */
export async function uploadMultipleImages(
    base64Strings: string[],
    folder: string = "uploads"
): Promise<CloudinaryUploadResult[]> {
    const uploadPromises = base64Strings.map((base64) =>
        uploadImageFromBase64(base64, folder)
    );
    return Promise.all(uploadPromises);
}

/**
 * Delete image from Cloudinary
 * @param publicId - Public ID of the image to delete
 * @returns Success status
 */
export async function deleteImage(publicId: string): Promise<boolean> {
    try {
        await cloudinary.uploader.destroy(publicId);
        return true;
    } catch (error) {
        console.error("❌ Cloudinary delete error:", error);
        return false;
    }
}

/**
 * Upload resume/document to Cloudinary
 * @param base64String - Base64 encoded file string
 * @param userId - User ID for organizing files
 * @returns Upload result with URL
 */
export async function uploadResume(
    base64String: string,
    userId: number
): Promise<CloudinaryUploadResult> {
    try {
        const result: UploadApiResponse = await cloudinary.uploader.upload(base64String, {
            folder: `skillsync/resumes/${userId}`,
            resource_type: "auto",
            format: "pdf", // Force PDF format for resumes
        });

        return {
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
        };
    } catch (error) {
        console.error("❌ Resume upload error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Upload failed",
        };
    }
}
