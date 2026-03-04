import { Request, Response } from "express";
import { uploadImageFromBase64 } from "../utils/cloudinary.util";
import ApiResponse from "../utils/api-response.util";

/**
 * Upload Controller
 * Handles file uploads to Cloudinary
 */
class UploadController {
    /**
     * Upload image to Cloudinary
     * @route POST /api/upload/image
     */
    async uploadImage(req: Request, res: Response): Promise<void> {
        try {
            const { base64String, folder = "uploads" } = req.body;

            if (!base64String) {
                ApiResponse.badRequest(res, "Base64 string is required");
                return;
            }

            const result = await uploadImageFromBase64(base64String, folder);

            if (result.success) {
                ApiResponse.success(
                    res,
                    { url: result.url, publicId: result.publicId },
                    "Image uploaded successfully"
                );
            } else {
                ApiResponse.error(res, result.error || "Upload failed", 500);
            }
        } catch (error) {
            ApiResponse.error(
                res,
                error instanceof Error ? error.message : "Upload failed",
                500
            );
        }
    }

    /**
     * Upload multiple images to Cloudinary
     * @route POST /api/upload/images
     */
    async uploadMultipleImages(req: Request, res: Response): Promise<void> {
        try {
            const { base64Strings, folder = "uploads" } = req.body;

            if (!base64Strings || !Array.isArray(base64Strings)) {
                ApiResponse.badRequest(res, "Array of base64 strings is required");
                return;
            }

            const uploadPromises = base64Strings.map((base64: string) =>
                uploadImageFromBase64(base64, folder)
            );

            const results = await Promise.all(uploadPromises);
            const urls = results
                .filter((r) => r.success)
                .map((r) => ({ url: r.url, publicId: r.publicId }));

            ApiResponse.success(res, urls, "Images uploaded successfully");
        } catch (error) {
            ApiResponse.error(
                res,
                error instanceof Error ? error.message : "Upload failed",
                500
            );
        }
    }
}

export default UploadController;
