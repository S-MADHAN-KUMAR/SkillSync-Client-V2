import NeonDatabase from "../database/neon.database";

/**
 * Database Migration Script
 * ─────────────────────────────────────────────────────
 * Creates all required tables in Neon PostgreSQL.
 * Run with: npx ts-node -r tsconfig-paths/register src/migrations/create-tables.ts
 */
async function runMigrations() {
    const db = NeonDatabase.getInstance();
    const sql = db.connect();

    console.log("🔄 Starting database migrations...\n");

    try {
        // ══════════════════════════════════════════════════
        // 1. USERS TABLE
        // ══════════════════════════════════════════════════
        console.log("📋 Creating users table...");
        await sql`
      CREATE TABLE IF NOT EXISTS users (
        id              SERIAL PRIMARY KEY,
        full_name       VARCHAR(255) NOT NULL,
        email           VARCHAR(255) UNIQUE NOT NULL,
        mobile_number   VARCHAR(20),
        password        VARCHAR(255) NOT NULL,
        user_type       VARCHAR(20) NOT NULL CHECK (user_type IN ('candidate', 'employer')),
        is_verified     BOOLEAN DEFAULT FALSE,
        is_onboarded    BOOLEAN DEFAULT FALSE,
        otp             VARCHAR(10),
        otp_expires_at  TIMESTAMP,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
        console.log("✅ users table created\n");

        // ══════════════════════════════════════════════════
        // 2. CANDIDATES TABLE
        // ══════════════════════════════════════════════════
        console.log("📋 Creating candidates table...");
        await sql`
      CREATE TABLE IF NOT EXISTS candidates (
        id                  SERIAL PRIMARY KEY,
        user_id             INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,

        -- Step 1: Professional Info
        jobtitle            VARCHAR(255),
        coreskills          JSONB DEFAULT '[]'::jsonb,
        resumecv            TEXT,

        -- Step 2: Personal Details
        profileimage        TEXT,
        bannerimage         TEXT,
        dob                 DATE,
        gender              VARCHAR(20),
        city                VARCHAR(100),
        state               VARCHAR(100),
        country             VARCHAR(100),
        pincode             VARCHAR(20),
        linkedin            VARCHAR(500),
        portfolio           VARCHAR(500),

        -- Step 3: Professional Details
        experiencestatus    VARCHAR(50),
        totalexperience     VARCHAR(50),
        currenttitle        VARCHAR(255),
        currentcompany      VARCHAR(255),
        noticeperiod        VARCHAR(50),
        expectedsalary      VARCHAR(100),
        preferredlocation   VARCHAR(255),
        workmode            JSONB DEFAULT '[]'::jsonb,

        -- Step 4: Education
        education           JSONB DEFAULT '[]'::jsonb,

        created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
        console.log("✅ candidates table created\n");

        // ══════════════════════════════════════════════════
        // 3. EMPLOYERS TABLE
        // ══════════════════════════════════════════════════
        console.log("📋 Creating employers table...");
        await sql`
      CREATE TABLE IF NOT EXISTS employers (
        id                SERIAL PRIMARY KEY,
        user_id           INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,

        -- Step 1: Branding & Basics
        companyname       VARCHAR(255),
        brandname         VARCHAR(255),
        industry          VARCHAR(100),
        companylogo       TEXT,
        companybanner     TEXT,

        -- Step 2: Company Structure
        companytype       VARCHAR(50),
        companysize       VARCHAR(20),
        foundedyear       INTEGER,
        website           VARCHAR(500),

        -- Step 3: Headquarters
        country           VARCHAR(100),
        state             VARCHAR(100),
        city              VARCHAR(100),
        pincode           VARCHAR(20),
        location          TEXT,
        ispublic          BOOLEAN DEFAULT TRUE,

        created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
        console.log("✅ employers table created\n");

        // ══════════════════════════════════════════════════
        // CREATE INDEXES
        // ══════════════════════════════════════════════════
        console.log("📋 Creating indexes...");
        await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_users_user_type ON users(user_type)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_candidates_user_id ON candidates(user_id)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_employers_user_id ON employers(user_id)`;
        console.log("✅ Indexes created\n");

        console.log("╔══════════════════════════════════════════════╗");
        console.log("║  ✅  All migrations completed successfully!  ║");
        console.log("╚══════════════════════════════════════════════╝\n");
    } catch (error) {
        console.error("❌ Migration failed:", error);
        process.exit(1);
    }
}

runMigrations();
