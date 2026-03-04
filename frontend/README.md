# SkillSync - Next.js Application

A Next.js (App Router) application featuring a custom-themed Landing, Registration and Login experience.

## Theme
- **Dark Mode**: Enabled by default
- **Font**: Manrope (via Google Fonts/Next Font)
- **Icons**: Material Symbols Outlined
- **Colors**:
   - reg-dark: #0f0f0f
   - reg-card: #1a1a1a
   - accent-green: #c1e7d1
   - accent-pink: #f6c3cc
   - accent-yellow: #f9e8b1
   - input-bg: #262626

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open http://localhost:4000 in your browser.

## Project Structure
- `src/app/page.tsx`: Landing page
- `src/app/register/page.tsx`: Registration page (with role toggle: candidate/employer)
- `src/app/login/page.tsx`: Login page
- `src/app/onboarding/page.tsx`: Candidate onboarding (6 steps)
- `src/app/onboarding/employer/page.tsx`: Employer onboarding (4 steps)
- `src/app/jobs/page.tsx`: Job listing and detail view
- `src/app/dashboard/candidate/page.tsx`: Candidate social feed dashboard
- `src/app/dashboard/employer/page.tsx`: Employer social feed dashboard
- `src/components/AuthLayout.tsx`: Shared layout for auth pages
- `src/components/Sidebar.tsx`: Reusable sidebar navigation
- `src/app/globals.css`: Tailwind/global styles and utilities

## Pages
- **Landing**: `/` - Homepage with hero, search, categories
- **Register**: `/register` - Create account (candidate or employer)
- **Login**: `/login` - Sign in
- **Candidate Onboarding**: `/onboarding` - 6-step profile setup
- **Employer Onboarding**: `/onboarding/employer` - 4-step company setup
- **Jobs**: `/jobs` - Browse and view job listings
- **Candidate Dashboard**: `/dashboard/candidate` - Social feed for candidates
- **Employer Dashboard**: `/dashboard/employer` - Social feed for employers

## Notes
- The app brand has been renamed to **SkillSync**. Update any external metadata if needed.
- All forms currently log to console (no backend integration yet).
