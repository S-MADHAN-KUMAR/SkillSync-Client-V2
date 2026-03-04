import dotenv from "dotenv";
import path from "path";

// Load .env from the server root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface IEnvConfig {
    PORT: number;
    NODE_ENV: string;
    DATABASE_URL: string;
    CORS_ORIGIN: string;
}

const envConfig: IEnvConfig = {
    PORT: parseInt(process.env.PORT || "5000", 10),
    NODE_ENV: process.env.NODE_ENV || "development",
    DATABASE_URL: process.env.DATABASE_URL || "",
    CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:4000",
};

export default envConfig;
