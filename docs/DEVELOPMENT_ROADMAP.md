# SpendBetter - Development Roadmap

## Claude Code Task Breakdown

This document breaks the MVP into discrete tasks optimized for Claude Code sessions. Each task is scoped to ~1-2 hours of work.

---

## Phase 0: Project Setup (Day 1)

### Task 0.1: Initialize Next.js Project
```
Create a new Next.js 14 project with:
- App Router
- TypeScript
- Tailwind CSS
- ESLint

Commands:
npx create-next-app@latest spendbetter --typescript --tailwind --eslint --app --src-dir
```

### Task 0.2: Set Up Supabase
1. Create Supabase project at supabase.com (free tier)
2. Run the migration SQL from DATABASE_SCHEMA.md
3. Note your project URL and anon key
4. Create `.env.local` with credentials

### Task 0.3: Install Dependencies
```
npm install @supabase/supabase-js
npm install -D @types/node
```

---

## Phase 1: Core Data Layer (Days 2-3)

### Task 1.1: Supabase Client Setup
**Prompt for Claude Code:**
```
Create a Supabase client configuration in lib/supabase.ts that:
- Uses environment variables for URL and anon key
- Exports a typed client
- Works in both server and client components
```

### Task 1.2: Type Definitions
**Prompt for Claude Code:**
```
Create TypeScript types in lib/types.ts matching our database schema:
- Company (with computed risk_level)
- Signal
- SignalType
- Category
- Alternative
Include the enums for risk_level, signal category, etc.
```

### Task 1.3: Data Import Script
**Prompt for Claude Code:**
```
Create a Node.js script in scripts/import-data.ts that:
- Reads CSV files from /data folder
- Upserts to Supabase tables in correct order (categories first, then companies, etc.)
- Recalculates risk scores after import
- Can be run with: npx ts-node scripts/import-data.ts
```

### Task 1.4: Data Fetching Functions
**Prompt for Claude Code:**
```
Create data fetching functions in lib/data.ts:
- getCompanies(filters?) - list with optional category/risk filter
- getCompanyBySlug(slug) - single company with signals and alternatives
- getCategories() - all categories
- searchCompanies(query) - text search
All functions should use the Supabase client and return typed data.
```

---

## Phase 2: Core Pages (Days 4-6)

### Task 2.1: Home Page with Search
**Prompt for Claude Code:**
```
Create the home page (app/page.tsx) with:
- Hero section explaining the tool's purpose
- Search bar (client component) that filters companies
- Category quick-links grid
- "Recently flagged" section showing 5 red-rated companies
Use Tailwind for styling, mobile-first responsive design.
```

### Task 2.2: Company Profile Page
**Prompt for Claude Code:**
```
Create company profile page at app/company/[slug]/page.tsx:
- Company name, risk badge (green/yellow/red)
- Score breakdown by category (democracy, civil rights, labor)
- List of signals with source links
- "Better Options" section with alternatives
- "Why we flagged this" explanation
Generate static params for all companies.
```

### Task 2.3: Category Browse Page
**Prompt for Claude Code:**
```
Create category page at app/category/[slug]/page.tsx:
- Category title and description
- List of flagged companies in this category (sorted by risk)
- List of recommended alternatives for this category
- Filter by risk level (all/red/yellow)
```

### Task 2.4: Search Results Page
**Prompt for Claude Code:**
```
Create search page at app/search/page.tsx:
- Takes ?q= query parameter
- Shows matching companies with risk badges
- "No results" state with suggestions
- Links to category browse as fallback
```

---

## Phase 3: Components Library (Day 7)

### Task 3.1: Risk Badge Component
**Prompt for Claude Code:**
```
Create a RiskBadge component in components/RiskBadge.tsx:
- Props: level ('green' | 'yellow' | 'red'), size ('sm' | 'md' | 'lg')
- Shows colored badge with label
- Accessible (proper contrast, aria-label)
```

### Task 3.2: Company Card Component
**Prompt for Claude Code:**
```
Create CompanyCard component in components/CompanyCard.tsx:
- Shows company name, risk badge, primary category
- Brief description (truncated)
- Click links to company profile
- Used in search results and category pages
```

### Task 3.3: Signal List Component
**Prompt for Claude Code:**
```
Create SignalList component in components/SignalList.tsx:
- Lists signals with type icon, title, date
- Each signal expandable to show description
- Source link that opens in new tab
- "Based on public records" disclaimer
```

### Task 3.4: Alternative Card Component
**Prompt for Claude Code:**
```
Create AlternativeCard component in components/AlternativeCard.tsx:
- Shows alternative name, type badge (national/local/cooperative)
- Practicality indicator (easy/moderate/niche)
- Brief rationale
- External link to website if available
```

---

## Phase 4: About & Legal (Day 8)

### Task 4.1: About/Methodology Page
**Prompt for Claude Code:**
```
Create about page at app/about/page.tsx with sections:
- What this tool does (not a boycott list)
- How companies are scored (link to scoring breakdown)
- Data sources we use
- How to submit corrections
Keep tone neutral and factual.
```

### Task 4.2: Scoring Methodology Page
**Prompt for Claude Code:**
```
Create methodology page at app/methodology/page.tsx:
- Full table of signal types and weights
- Explanation of score calculation
- Risk level thresholds
- "All weights are public and documented"
```

### Task 4.3: Legal Disclaimer
**Prompt for Claude Code:**
```
Add footer component with legal disclaimer:
- "Information based on public records"
- "Not legal or financial advice"
- "Companies may dispute claims - see methodology"
- Link to submit corrections
```

---

## Phase 5: Polish & Deploy (Days 9-10)

### Task 5.1: SEO & Metadata
**Prompt for Claude Code:**
```
Add proper metadata to all pages:
- Dynamic titles and descriptions
- Open Graph tags for social sharing
- Structured data (JSON-LD) for companies
- Sitemap generation
```

### Task 5.2: Error & Loading States
**Prompt for Claude Code:**
```
Add proper error handling:
- app/error.tsx for runtime errors
- app/not-found.tsx for 404s
- Loading skeletons for async components
- Empty states for no results
```

### Task 5.3: Mobile Optimization
**Prompt for Claude Code:**
```
Review and optimize for mobile:
- Touch-friendly tap targets
- Readable text sizes
- Proper viewport handling
- Test on mobile simulator
```

### Task 5.4: Deploy to Vercel
```
1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy
5. Configure custom domain (optional)
```

---

## Phase 6: Post-MVP Improvements

### 6.1: User Submissions (Week 2)
- Add submission form for new signals
- Queue for moderation
- Email notifications

### 6.2: Admin Dashboard (Week 3)
- Protected admin routes
- Approve/reject submissions
- Edit company data
- View analytics

### 6.3: Browser Extension (Month 2)
- Chrome extension that checks current site
- Shows risk badge if company is in database
- Links to alternatives

---

## Prompting Tips for Claude Code

### Be Specific About Files
```
✅ "Create app/company/[slug]/page.tsx"
❌ "Create the company page"
```

### Reference Existing Code
```
✅ "Use the Supabase client from lib/supabase.ts"
✅ "Follow the pattern in the home page"
```

### Include Type Information
```
✅ "The function should return Promise<Company[]>"
```

### Request Tests When Needed
```
✅ "Add a test file for this component"
```

### Ask for Incremental Work
```
✅ "First create the basic component, then we'll add the filtering"
```

---

## Estimated Timeline

| Phase | Tasks | Time |
|-------|-------|------|
| 0: Setup | 3 tasks | 2-3 hours |
| 1: Data Layer | 4 tasks | 4-6 hours |
| 2: Core Pages | 4 tasks | 6-8 hours |
| 3: Components | 4 tasks | 3-4 hours |
| 4: About/Legal | 3 tasks | 2-3 hours |
| 5: Polish/Deploy | 4 tasks | 3-4 hours |
| **Total MVP** | **22 tasks** | **20-28 hours** |

*Can be completed in 1-2 weeks of part-time work*

---

## Quick Start Checklist

- [ ] Create Supabase project
- [ ] Run database migrations
- [ ] Create Next.js project
- [ ] Set environment variables
- [ ] Import seed data
- [ ] Build pages with Claude Code
- [ ] Deploy to Vercel
- [ ] Add custom domain
- [ ] Announce MVP!
