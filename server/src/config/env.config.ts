import dotenv from "dotenv";
import path from "path";

// Load .env from the server root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface IEnvConfig {
    PORT: number;
    NODE_ENV: string;
    DATABASE_URL: string;
    CORS_ORIGIN: string;
    COMPANY_MAIL: string;
    MAIL_PASSWORD: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
}

const envConfig: IEnvConfig = {
    PORT: parseInt(process.env.PORT || "5000", 10),
    NODE_ENV: process.env.NODE_ENV || "development",
    DATABASE_URL: process.env.DATABASE_URL || "",
    CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:4000",
    COMPANY_MAIL: process.env.COMPANY_MAIL || "skillsync.job.portal@gmail.com",
    MAIL_PASSWORD: process.env.MAIL_PASSWORD || "nsjh uwxr aghv hmev",
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
};

export default envConfig;
export { envConfig };
