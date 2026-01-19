# SpendBetter - Ready-to-Use Claude Code Prompts

Copy these prompts directly into Claude Code to build each part of the MVP.

---

## 🚀 Session 1: Project Initialization

### Prompt 1.1: Create Next.js Project
```
Create a new Next.js 14 project called "spendbetter" with:
- App Router (not pages)
- TypeScript
- Tailwind CSS
- ESLint
- src directory

Use: npx create-next-app@latest

After creation, install @supabase/supabase-js
```

### Prompt 1.2: Environment Setup
```
Create a .env.local.example file with these variables:
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

Also create a .gitignore that excludes .env.local
```

---

## 🗄️ Session 2: Supabase & Types

### Prompt 2.1: Supabase Client
```
Create lib/supabase.ts with:
- A createClient function for server components
- A createBrowserClient function for client components
- Use environment variables from process.env

Reference: https://supabase.com/docs/guides/auth/server-side/nextjs
```

### Prompt 2.2: TypeScript Types
```
Create lib/types.ts with TypeScript interfaces matching this schema:

Category: id, slug, name, description, icon, sort_order
Company: id, slug, name, parent_company, description, website,
         democracy_score, civil_rights_score, labor_score,
         total_score, risk_level (green|yellow|red)
SignalType: id, code, name, description, category (democracy|civil_rights|labor), default_weight
Signal: id, company_id, signal_type_id, title, description,
        evidence_url, evidence_source, evidence_date, verified
Alternative: id, slug, name, description, website,
             type (national|local_tip|cooperative),
             practicality (easy|moderate|niche)

Also create a CompanyWithDetails type that includes signals and alternatives arrays.
```

---

## 📊 Session 3: Data Functions

### Prompt 3.1: Data Fetching Layer
```
Create lib/data.ts with these async functions using the Supabase client:

1. getCategories() - returns all categories sorted by sort_order
2. getCompanies(categorySlug?: string, riskLevel?: string) - returns companies with optional filters
3. getCompanyBySlug(slug: string) - returns single company with:
   - All its signals (joined with signal_types)
   - All its alternatives (through company_alternatives)
   - Its categories
4. searchCompanies(query: string) - text search on company name
5. getAlternativesByCategory(categorySlug: string) - alternatives for a category

All functions should be typed and handle errors gracefully.
```

### Prompt 3.2: Data Import Script
```
Create scripts/import-data.ts that:
1. Reads CSV files from ../data/ folder (categories.csv, companies.csv, signals.csv, alternatives.csv)
2. Uses Supabase admin client (with service role key)
3. Imports in order: categories → companies → signal_types → signals → alternatives
4. Handles the company_categories junction table
5. Recalculates risk scores after import

Use csv-parse package for CSV reading.
Make it runnable with: npx ts-node --esm scripts/import-data.ts
```

---

## 🏠 Session 4: Home Page

### Prompt 4.1: Home Page
```
Create app/page.tsx as the home page with:

1. Hero section:
   - Headline: "Shop Your Values"
   - Subhead: "Make purchasing decisions aligned with democracy and civil rights"
   - Search bar (client component)

2. Category grid:
   - 2 columns on mobile, 4 on desktop
   - Each category shows icon, name, links to /category/[slug]

3. "Recently Flagged" section:
   - Show 5 companies with risk_level='red'
   - Each as a card with name, risk badge, primary category

Use Tailwind CSS. Make it mobile-first and accessible.
Fetch data using the functions from lib/data.ts
```

### Prompt 4.2: Search Component
```
Create components/SearchBar.tsx as a client component:
- Input field with search icon
- Debounced input (300ms)
- Shows dropdown with matching companies as user types
- Each result shows company name and risk badge
- Clicking result navigates to /company/[slug]
- "View all results" link goes to /search?q=query
- Accessible with keyboard navigation
```

---

## 📄 Session 5: Company Profile

### Prompt 5.1: Company Page
```
Create app/company/[slug]/page.tsx:

1. Header:
   - Company name (large)
   - Risk badge (prominent)
   - Parent company if exists
   - Categories as tags

2. Score breakdown:
   - Visual bars or numbers for democracy, civil rights, labor scores
   - Explanation of what each means

3. Signals section:
   - List each signal with:
     - Signal type name and icon
     - Title and description
     - Source link (opens new tab)
     - Date
   - Group by category (democracy, civil rights, labor)

4. Better Options section:
   - Show alternatives with practicality badges
   - Brief rationale for each
   - Links to websites

5. Footer:
   - "Based on public records" disclaimer
   - "Report an error" link

Use generateStaticParams to pre-render all company pages.
```

### Prompt 5.2: Risk Badge Component
```
Create components/RiskBadge.tsx:
- Props: level ('green' | 'yellow' | 'red'), size ('sm' | 'md' | 'lg')
- Green: "Lower Risk" with green background
- Yellow: "Moderate Risk" with yellow background
- Red: "Higher Risk" with red background
- Accessible colors (proper contrast)
- Include aria-label
```

---

## 📁 Session 6: Category Pages

### Prompt 6.1: Category Page
```
Create app/category/[slug]/page.tsx:

1. Header:
   - Category name and icon
   - Description

2. Filter tabs:
   - All / Red only / Yellow only
   - Client-side filtering

3. Flagged companies list:
   - Cards sorted by total_score (highest first)
   - Show risk badge, name, brief description
   - Link to company profile

4. Recommended alternatives:
   - Section showing alternatives for this category
   - Grouped by type (national, local, cooperative)
   - Practicality indicators

Use generateStaticParams for all category slugs.
```

---

## 🔍 Session 7: Search Results

### Prompt 7.1: Search Page
```
Create app/search/page.tsx:
- Reads ?q= query parameter
- Shows search query in heading
- Lists matching companies as cards
- If no results:
  - Friendly message
  - Suggestions to browse by category
  - Link back to home
- Include the SearchBar component at top (pre-filled with query)
```

---

## ℹ️ Session 8: About Pages

### Prompt 8.1: About Page
```
Create app/about/page.tsx with these sections:

1. What This Is
   - Not a boycott list
   - A decision-support tool
   - Like Consumer Reports for corporate ethics

2. How It Works
   - Companies flagged based on documented signals
   - Signals have sources and evidence
   - Scores are transparent and adjustable

3. Our Sources
   - List the data sources (OpenSecrets, FEC, USAspending, etc.)
   - Explain each briefly

4. How to Help
   - Submit corrections
   - Suggest new companies
   - Share with others

Keep tone neutral, factual, not preachy.
```

### Prompt 8.2: Methodology Page
```
Create app/methodology/page.tsx:

1. Signal Types table:
   - Show all signal types with weights
   - Grouped by category

2. Score Calculation:
   - Explain the formula
   - Show threshold table (0-3=green, 4-8=yellow, 9+=red)

3. Why These Weights:
   - Brief rationale for each signal type
   - "Weights may be adjusted based on community input"

4. Transparency Commitment:
   - All data is traceable
   - No anonymous claims
   - Companies can submit rebuttals
```

---

## 🎨 Session 9: Shared Components

### Prompt 9.1: Layout & Navigation
```
Create app/layout.tsx with:
- Header: Logo, nav links (Home, Categories dropdown, About, Methodology)
- Footer: Legal disclaimer, links, copyright
- Mobile menu (hamburger)

Create components/Header.tsx and components/Footer.tsx
```

### Prompt 9.2: Company Card
```
Create components/CompanyCard.tsx:
- Props: company object
- Shows: name, risk badge, primary category, truncated description
- Hover state
- Links to /company/[slug]
- Used in search results and category pages
```

### Prompt 9.3: Alternative Card
```
Create components/AlternativeCard.tsx:
- Props: alternative object
- Shows: name, type badge, practicality, description
- External link icon for website
- Different styling than CompanyCard (more positive/green tint)
```

---

## 🚀 Session 10: Polish & Deploy

### Prompt 10.1: SEO Metadata
```
Add metadata to all pages:

1. app/layout.tsx: default metadata with site name, description
2. Each page: dynamic metadata based on content
3. Company pages: include company name, risk level in title/description
4. Add generateMetadata function to dynamic pages

Also create app/sitemap.ts that generates sitemap.xml with all pages.
```

### Prompt 10.2: Error Handling
```
Create:
1. app/error.tsx - generic error boundary with retry button
2. app/not-found.tsx - 404 page with links to home and categories
3. app/loading.tsx - loading skeleton

Add try/catch to all data fetching with user-friendly error messages.
```

### Prompt 10.3: Final Review
```
Review the codebase for:
1. Accessibility: proper headings, alt text, keyboard navigation, color contrast
2. Mobile: test all pages at 375px width
3. Performance: no unnecessary client components, proper caching
4. Security: no exposed API keys, proper input sanitization

Fix any issues found.
```

---

## 📝 Quick Reference

### File Structure
```
src/
├── app/
│   ├── page.tsx              # Home
│   ├── layout.tsx            # Root layout
│   ├── error.tsx             # Error boundary
│   ├── not-found.tsx         # 404
│   ├── company/[slug]/page.tsx
│   ├── category/[slug]/page.tsx
│   ├── search/page.tsx
│   ├── about/page.tsx
│   └── methodology/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── SearchBar.tsx
│   ├── RiskBadge.tsx
│   ├── CompanyCard.tsx
│   └── AlternativeCard.tsx
└── lib/
    ├── supabase.ts
    ├── types.ts
    └── data.ts
```

### Color Palette
```
Green (lower risk): bg-green-100 text-green-800 border-green-300
Yellow (moderate): bg-yellow-100 text-yellow-800 border-yellow-300
Red (higher risk): bg-red-100 text-red-800 border-red-300
```

### Key Dependencies
```json
{
  "@supabase/supabase-js": "^2.x",
  "next": "^14.x",
  "react": "^18.x",
  "typescript": "^5.x"
}
```
