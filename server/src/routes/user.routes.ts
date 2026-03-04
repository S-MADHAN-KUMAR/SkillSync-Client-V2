import { Router } from "express";
import UserController from "../controllers/user.controller";

/**
 * User Routes — maps HTTP endpoints to controller methods
 * 
 * POST /api/users/register     → Register new user
 * POST /api/users/login        → Login user
 * POST /api/users/verify-otp   → Verify email OTP
 * POST /api/users/resend-otp   → Resend OTP
 * GET  /api/users              → Get all users
 * GET  /api/users/:id          → Get user by ID
 * PUT  /api/users/:id          → Update user
 */
class UserRoutes {
    public router: Router;
    private userController: UserController;

    constructor(userController: UserController) {
        this.router = Router();
        this.userController = userController;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // Auth routes
        this.router.post("/register", this.userController.register);
        this.router.post("/login", this.userController.login);
        this.router.post("/verify-otp", this.userController.verifyOtp);
        this.router.post("/resend-otp", this.userController.resendOtp);
        this.router.post("/forgot-password", this.userController.forgotPassword);
        this.router.post("/reset-password", this.userController.resetPassword);

        // CRUD routes
        this.router.get("/", this.userController.getAll);
        this.router.get("/:id", this.userController.getById);
        this.router.put("/:id", this.userController.update);
    }
}

export default UserRoutes;
