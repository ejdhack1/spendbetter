# SpendBetter - MVP Architecture

## Overview
A web app helping consumers make values-aligned purchasing decisions by showing company risk scores and suggesting alternatives.

## Recommended Stack (Low-Cost MVP)

### Frontend: Next.js 14 (App Router)
- **Why**: Server-side rendering for SEO, React-based, excellent DX
- **Hosting**: Vercel (free tier: 100GB bandwidth, serverless functions)
- **Cost**: $0 for MVP traffic levels

### Database: Supabase (PostgreSQL)
- **Why**: Free tier generous (500MB, 50k MAU auth), built-in REST API, real-time optional
- **Cost**: $0 for MVP (free tier), $25/mo if you exceed
- **Alternative**: PlanetScale (MySQL) if you prefer

### Search: PostgreSQL Full-Text Search
- **Why**: No additional service needed, fast enough for <1000 companies
- **Upgrade path**: Algolia or Typesense when needed

### Auth (if needed): Supabase Auth
- **Why**: Built-in, free, supports magic links for moderators
- **MVP Note**: Public read, auth only for moderator submissions

### File Storage: Not needed for MVP
- All data is structured text/JSON

---

## Cost Estimate (Monthly)

| Service | Free Tier Limit | Your Expected Use | Cost |
|---------|-----------------|-------------------|------|
| Vercel | 100GB bandwidth | ~5GB | $0 |
| Supabase | 500MB DB, 50k auth | ~50MB, <100 users | $0 |
| Domain | - | 1 domain | ~$12/year |
| **Total** | | | **~$1/month** |

*Scales to ~$25-50/mo at 25k MAU target*

---

## Data Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Vercel    │────▶│  Supabase   │────▶│ PostgreSQL  │
│  (Next.js)  │◀────│   (API)     │◀────│   (Data)    │
└─────────────┘     └─────────────┘     └─────────────┘
       │
       ▼
┌─────────────┐
│   User      │
│  Browser    │
└─────────────┘
```

---

## Key Design Decisions

### 1. Static Generation for Company Pages
Generate company profile pages at build time for speed and SEO.
Rebuild on data changes (Supabase webhook → Vercel rebuild).

### 2. Client-Side Search with Server Fallback
- Initial: Load company index client-side (~50KB for 300 companies)
- Search happens instantly in browser
- Fallback to API for complex filters

### 3. CSV-First Data Entry
- Maintain data in CSV/spreadsheets for easy editing
- Import script syncs to Supabase
- Version control your data in git

### 4. Moderation via Supabase Dashboard (MVP)
- Skip building admin UI initially
- Use Supabase's built-in table editor
- Add admin UI in Phase 2

---

## Security Model

| Role | Can Do |
|------|--------|
| Public | Read companies, signals, alternatives |
| Submitter | Submit new signals (queued for review) |
| Moderator | Approve/reject submissions, edit data |
| Admin | All above + manage moderators |

MVP: Public read only. Moderators use Supabase dashboard.

---

## Performance Targets

| Metric | Target | How |
|--------|--------|-----|
| Search latency | <100ms | Client-side index |
| Page load | <2s | Static generation |
| API response | <300ms | Edge functions + DB indexes |

---

## Deployment Steps

1. Create Supabase project (free)
2. Run schema migration
3. Import seed data from CSV
4. Deploy to Vercel (connect GitHub repo)
5. Configure environment variables
6. Set up custom domain

---

## File Structure

```
spendbetter/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home/search
│   ├── company/[slug]/    # Company profiles
│   ├── category/[slug]/   # Category browse
│   ├── about/             # Methodology, transparency
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utilities, DB client
├── data/                  # CSV source files
│   ├── companies.csv
│   ├── signals.csv
│   ├── categories.csv
│   └── alternatives.csv
├── scripts/               # Data import scripts
└── supabase/
    └── migrations/        # Database schema
```
