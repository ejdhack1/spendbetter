# SpendBetter - Database Schema

## Entity Relationship

```
categories ──┬── companies ──┬── signals
             │               │
             │               └── company_alternatives
             │                        │
             └────────────────────────┘
                                      │
                            alternatives ◀┘

submissions ── (pending review) ──▶ signals
```

---

## Tables

### 1. categories
Shopping categories for browsing and filtering.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| slug | text | URL-friendly, unique (e.g., "home-improvement") |
| name | text | Display name (e.g., "Home Improvement") |
| description | text | Brief explanation |
| icon | text | Emoji or icon name |
| sort_order | int | Display ordering |
| created_at | timestamptz | |

**MVP Categories (10):**
- Grocery & Food
- Home Improvement
- Electronics & Tech
- Clothing & Fashion
- Health & Pharmacy
- Financial Services
- Restaurants & Fast Food
- Entertainment & Media
- Travel & Transportation
- General Retail

---

### 2. companies
Core company records.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| slug | text | URL-friendly, unique |
| name | text | Official name |
| parent_company | text | Nullable, for subsidiaries |
| description | text | Brief description |
| website | text | Official website |
| logo_url | text | Nullable |
| democracy_score | int | 0-10, computed |
| civil_rights_score | int | 0-10, computed |
| labor_score | int | 0-10, computed |
| total_score | int | Sum of above |
| risk_level | text | 'green', 'yellow', 'red' |
| last_updated | timestamptz | When scores recalculated |
| created_at | timestamptz | |

**Indexes:**
- `idx_companies_slug` UNIQUE on slug
- `idx_companies_risk` on risk_level
- `idx_companies_name_search` GIN on name (full-text)

---

### 3. company_categories
Many-to-many: companies ↔ categories

| Column | Type | Notes |
|--------|------|-------|
| company_id | uuid | FK → companies |
| category_id | uuid | FK → categories |
| is_primary | bool | Main category for display |

**PK:** (company_id, category_id)

---

### 4. signal_types
Enumeration of signal categories.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| code | text | Unique (e.g., "election_denial") |
| name | text | Display name |
| description | text | What this signal means |
| category | text | 'democracy', 'civil_rights', 'labor' |
| default_weight | int | Default severity (1-5) |
| sort_order | int | |

**MVP Signal Types:**

| Code | Name | Category | Weight |
|------|------|----------|--------|
| election_denial | Election Denial Funding | democracy | 5 |
| anti_voting | Anti-Voting Rights Lobbying | democracy | 4 |
| trump_pac | Major Trump PAC Donations | democracy | 4 |
| gop_donations | GOP Donations | democracy | 1 |
| ice_contracts | ICE/DHS Contracts | civil_rights | 4 |
| surveillance | Surveillance Tech | civil_rights | 3 |
| anti_lgbtq | Anti-LGBTQ Funding | civil_rights | 4 |
| dei_rollback | DEI Program Elimination | civil_rights | 3 |
| anti_union | Anti-Union Actions | labor | 3 |
| labor_violations | Labor Law Violations | labor | 4 |

---

### 5. signals
Individual documented signals for companies.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| company_id | uuid | FK → companies |
| signal_type_id | uuid | FK → signal_types |
| title | text | Brief headline |
| description | text | What happened |
| evidence_url | text | Primary source link |
| evidence_source | text | Organization name (e.g., "OpenSecrets") |
| evidence_date | date | When the event occurred |
| weight_override | int | Nullable, if different from default |
| verified | bool | Has been fact-checked |
| created_at | timestamptz | |
| updated_at | timestamptz | |

**Indexes:**
- `idx_signals_company` on company_id
- `idx_signals_type` on signal_type_id

---

### 6. alternatives
Recommended alternative companies/options.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| slug | text | Unique |
| name | text | |
| description | text | Why it's recommended |
| website | text | |
| type | text | 'national', 'local_tip', 'cooperative' |
| practicality | text | 'easy', 'moderate', 'niche' |
| created_at | timestamptz | |

---

### 7. company_alternatives
Links companies to their alternatives by category.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| company_id | uuid | FK → companies (the one to avoid) |
| alternative_id | uuid | FK → alternatives |
| category_id | uuid | FK → categories |
| rationale | text | Why this is a good substitute |
| sort_order | int | Display priority |

---

### 8. submissions (Phase 1.5)
User-submitted signals awaiting moderation.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| company_name | text | May not exist yet |
| company_id | uuid | Nullable FK |
| signal_type_id | uuid | FK → signal_types |
| description | text | User's description |
| evidence_url | text | Required |
| submitter_email | text | For follow-up |
| status | text | 'pending', 'approved', 'rejected' |
| reviewer_notes | text | Moderation notes |
| reviewed_at | timestamptz | |
| created_at | timestamptz | |

---

## Score Calculation

```sql
-- Recalculate scores for a company
UPDATE companies c SET
  democracy_score = COALESCE((
    SELECT SUM(COALESCE(s.weight_override, st.default_weight))
    FROM signals s
    JOIN signal_types st ON s.signal_type_id = st.id
    WHERE s.company_id = c.id AND st.category = 'democracy'
  ), 0),
  civil_rights_score = COALESCE((
    SELECT SUM(COALESCE(s.weight_override, st.default_weight))
    FROM signals s
    JOIN signal_types st ON s.signal_type_id = st.id
    WHERE s.company_id = c.id AND st.category = 'civil_rights'
  ), 0),
  labor_score = COALESCE((
    SELECT SUM(COALESCE(s.weight_override, st.default_weight))
    FROM signals s
    JOIN signal_types st ON s.signal_type_id = st.id
    WHERE s.company_id = c.id AND st.category = 'labor'
  ), 0),
  total_score = democracy_score + civil_rights_score + labor_score,
  risk_level = CASE
    WHEN total_score >= 9 THEN 'red'
    WHEN total_score >= 4 THEN 'yellow'
    ELSE 'green'
  END,
  last_updated = NOW()
WHERE c.id = $1;
```

---

## Supabase Migration SQL

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Companies
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  parent_company TEXT,
  description TEXT,
  website TEXT,
  logo_url TEXT,
  democracy_score INTEGER DEFAULT 0,
  civil_rights_score INTEGER DEFAULT 0,
  labor_score INTEGER DEFAULT 0,
  total_score INTEGER DEFAULT 0,
  risk_level TEXT DEFAULT 'green' CHECK (risk_level IN ('green', 'yellow', 'red')),
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_companies_risk ON companies(risk_level);
CREATE INDEX idx_companies_name_search ON companies USING GIN (to_tsvector('english', name));

-- Company-Category junction
CREATE TABLE company_categories (
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false,
  PRIMARY KEY (company_id, category_id)
);

-- Signal Types
CREATE TABLE signal_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('democracy', 'civil_rights', 'labor')),
  default_weight INTEGER NOT NULL CHECK (default_weight BETWEEN 1 AND 5),
  sort_order INTEGER DEFAULT 0
);

-- Signals
CREATE TABLE signals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  signal_type_id UUID REFERENCES signal_types(id),
  title TEXT NOT NULL,
  description TEXT,
  evidence_url TEXT NOT NULL,
  evidence_source TEXT,
  evidence_date DATE,
  weight_override INTEGER CHECK (weight_override BETWEEN 1 AND 5),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_signals_company ON signals(company_id);

-- Alternatives
CREATE TABLE alternatives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  website TEXT,
  type TEXT CHECK (type IN ('national', 'local_tip', 'cooperative')),
  practicality TEXT CHECK (practicality IN ('easy', 'moderate', 'niche')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Company-Alternative links
CREATE TABLE company_alternatives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  alternative_id UUID REFERENCES alternatives(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id),
  rationale TEXT,
  sort_order INTEGER DEFAULT 0
);

-- Submissions (for user contributions)
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  company_id UUID REFERENCES companies(id),
  signal_type_id UUID REFERENCES signal_types(id),
  description TEXT NOT NULL,
  evidence_url TEXT NOT NULL,
  submitter_email TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewer_notes TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (public read, authenticated write)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE alternatives ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read companies" ON companies FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read signals" ON signals FOR SELECT USING (verified = true);
CREATE POLICY "Public read alternatives" ON alternatives FOR SELECT USING (true);
```

---

## Data Import Strategy

1. **Maintain CSVs in `/data` folder**
2. **Run import script** that:
   - Reads CSVs
   - Upserts to Supabase
   - Recalculates all scores
3. **Trigger Vercel rebuild** after import

This keeps data portable and version-controlled while Supabase handles serving.
