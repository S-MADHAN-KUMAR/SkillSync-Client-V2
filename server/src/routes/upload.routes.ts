import { Router } from "express";
import UploadController from "../controllers/upload.controller";

/**
 * Upload Routes
 * Defines API endpoints for file uploads
 */
class UploadRoutes {
    public router: Router;
    private controller: UploadController;

    constructor(controller: UploadController) {
        this.router = Router();
        this.controller = controller;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // POST /api/upload/image - Upload single image
        this.router.post("/image", (req, res) =>
            this.controller.uploadImage(req, res)
        );

        // POST /api/upload/images - Upload multiple images
        this.router.post("/images", (req, res) =>
            this.controller.uploadMultipleImages(req, res)
        );
    }
}

export default UploadRoutes;
