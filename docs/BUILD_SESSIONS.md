# SpendBetter - Build Sessions for Claude Pro

Claude Pro resets usage roughly every 5 hours. Each session below is designed to be completable in one usage window, with natural stopping points where you can test what you've built.

---

## Session 1: Foundation (First Window)
**Goal:** Working project with database connected

### What We'll Build
1. Create Next.js project with TypeScript + Tailwind
2. Set up Supabase client configuration
3. Create all TypeScript types
4. Write and run the data import script
5. Verify data is in Supabase

### Before Starting
- [ ] Create free Supabase project at supabase.com
- [ ] Run the migration SQL from DATABASE_SCHEMA.md in Supabase SQL editor
- [ ] Have your Supabase URL and anon key ready

### End State
You can query your database and see companies, signals, alternatives. No UI yet, but the data layer is solid.

### Test It
```bash
# In the project, we'll create a quick test script
npx ts-node scripts/test-connection.ts
# Should print: "Connected! Found 11 companies"
```

---

## Session 2: Core Pages (Second Window)
**Goal:** Browsable website with all main pages

### What We'll Build
1. Root layout with header/footer
2. Home page with category grid
3. Company profile page (dynamic route)
4. Category browse page (dynamic route)
5. Basic components: RiskBadge, CompanyCard

### End State
You can navigate the site, view company profiles, browse by category. Search doesn't work yet, but you can click around.

### Test It
- Visit http://localhost:3000
- Click a category → see companies
- Click a company → see profile with signals

---

## Session 3: Search & Polish (Third Window)
**Goal:** Fully functional MVP ready to deploy

### What We'll Build
1. Search bar component (client-side)
2. Search results page
3. About and Methodology pages
4. SEO metadata
5. Error/404 pages
6. Mobile responsive fixes

### End State
Complete MVP. All features working locally.

### Test It
- Search for "Amazon" → see results
- Visit /about and /methodology
- Test on mobile viewport
- Try a broken URL → see 404 page

---

## Session 4: Deploy & Launch (Fourth Window)
**Goal:** Live on the internet

### What We'll Do
1. Push to GitHub
2. Connect to Vercel
3. Configure environment variables
4. Deploy
5. Test production site
6. (Optional) Add custom domain

### End State
Live at yourproject.vercel.app (or custom domain)

### Test It
- Share the URL with a friend
- Test on actual mobile device
- Check that all pages load

---

## Detailed Task Breakdown Per Session

### Session 1 Tasks (Foundation)

| # | Task | Claude Code Prompt |
|---|------|-------------------|
| 1 | Init project | "Create Next.js 14 app with TypeScript, Tailwind, App Router, src directory. Name it spendbetter." |
| 2 | Install deps | "Install @supabase/supabase-js and csv-parse" |
| 3 | Env setup | "Create .env.local.example and add to .gitignore" |
| 4 | Supabase client | "Create lib/supabase.ts with server and browser clients using env vars" |
| 5 | Types | "Create lib/types.ts with interfaces for Company, Signal, SignalType, Category, Alternative matching our schema" |
| 6 | Data functions | "Create lib/data.ts with getCompanies, getCompanyBySlug, getCategories, searchCompanies, getAlternativesByCategory" |
| 7 | Import script | "Create scripts/import-data.ts that reads CSVs from data/ folder and upserts to Supabase" |
| 8 | Test script | "Create scripts/test-connection.ts that queries companies and prints count" |

**Estimated messages:** 15-25

---

### Session 2 Tasks (Core Pages)

| # | Task | Claude Code Prompt |
|---|------|-------------------|
| 1 | RiskBadge | "Create components/RiskBadge.tsx with green/yellow/red variants and sm/md/lg sizes" |
| 2 | CompanyCard | "Create components/CompanyCard.tsx showing name, risk badge, category, links to profile" |
| 3 | AlternativeCard | "Create components/AlternativeCard.tsx with type badge and practicality indicator" |
| 4 | Header | "Create components/Header.tsx with logo, nav links, mobile menu" |
| 5 | Footer | "Create components/Footer.tsx with disclaimer and links" |
| 6 | Layout | "Update app/layout.tsx to use Header and Footer" |
| 7 | Home page | "Create app/page.tsx with hero, category grid, recently flagged section" |
| 8 | Company page | "Create app/company/[slug]/page.tsx with scores, signals, alternatives" |
| 9 | Category page | "Create app/category/[slug]/page.tsx with company list and alternatives" |

**Estimated messages:** 20-30

---

### Session 3 Tasks (Search & Polish)

| # | Task | Claude Code Prompt |
|---|------|-------------------|
| 1 | SearchBar | "Create components/SearchBar.tsx as client component with debounced search and dropdown results" |
| 2 | Add to home | "Add SearchBar to home page hero section" |
| 3 | Search page | "Create app/search/page.tsx that shows results for ?q= parameter" |
| 4 | About page | "Create app/about/page.tsx explaining the tool, sources, how to help" |
| 5 | Methodology | "Create app/methodology/page.tsx with signal weights table and score explanation" |
| 6 | 404 page | "Create app/not-found.tsx with helpful links" |
| 7 | Error page | "Create app/error.tsx with retry button" |
| 8 | SEO | "Add generateMetadata to all pages with proper titles and descriptions" |
| 9 | Mobile fixes | "Review all pages for mobile responsiveness, fix any issues" |

**Estimated messages:** 20-30

---

### Session 4 Tasks (Deploy)

| # | Task | Action |
|---|------|--------|
| 1 | Git init | `git init && git add . && git commit -m "Initial MVP"` |
| 2 | GitHub | Create repo and push |
| 3 | Vercel | Connect repo at vercel.com |
| 4 | Env vars | Add SUPABASE_URL and SUPABASE_ANON_KEY in Vercel dashboard |
| 5 | Deploy | Click deploy |
| 6 | Test | Visit production URL, test all pages |
| 7 | Domain | (Optional) Add custom domain in Vercel settings |

**Estimated messages:** 5-10 (mostly manual steps)

---

## Tips for Staying Within Limits

### If You're Running Low on Messages

1. **Combine related tasks**: "Create RiskBadge, CompanyCard, and AlternativeCard components" instead of three separate requests

2. **Be specific upfront**: Include all requirements in first message to avoid back-and-forth

3. **Copy working patterns**: Once one page works, reference it: "Create category page following the same pattern as company page"

4. **Save debugging for next session**: If something's broken but not blocking, note it and fix next time

### Natural Pause Points

- **After Session 1**: You have data but no UI → good time to verify Supabase data looks right
- **After Session 2**: You can browse the site → good time to check content/copy
- **After Session 3**: Full local MVP → good time to test thoroughly before deploying

---

## Emergency: If You Hit Limits Mid-Session

### Save Your Progress
```bash
git add .
git commit -m "WIP: [describe where you stopped]"
```

### Document What's Left
Add to a TODO.md:
```markdown
## Remaining for this session
- [ ] Finish search results page
- [ ] Add error handling
```

### When You Resume
Start with: "I'm continuing work on SpendBetter. Last session I completed [X] and need to finish [Y]. Here's the current state: [paste any relevant error or code snippet]"

---

## Quick Reference: Session Goals

| Session | Time | Goal | You Can Test |
|---------|------|------|--------------|
| 1 | ~2 hrs | Data layer | Query Supabase, see companies |
| 2 | ~3 hrs | Core pages | Browse site, view profiles |
| 3 | ~3 hrs | Full MVP | Search, all pages work |
| 4 | ~1 hr | Deployed | Live URL to share |

**Total: ~9 hours across 4 sessions (4 days if waiting for resets)**
