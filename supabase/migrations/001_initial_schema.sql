-- SpendBetter Initial Schema
-- Run this in Supabase SQL Editor or via migrations

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
CREATE INDEX idx_signals_type ON signals(signal_type_id);

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

-- Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE signal_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE alternatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_alternatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read companies" ON companies FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read signals" ON signals FOR SELECT USING (verified = true);
CREATE POLICY "Public read signal_types" ON signal_types FOR SELECT USING (true);
CREATE POLICY "Public read alternatives" ON alternatives FOR SELECT USING (true);
CREATE POLICY "Public read company_alternatives" ON company_alternatives FOR SELECT USING (true);
CREATE POLICY "Public read company_categories" ON company_categories FOR SELECT USING (true);

-- Function to recalculate company scores
CREATE OR REPLACE FUNCTION recalculate_company_scores(target_company_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE companies SET
    democracy_score = COALESCE((
      SELECT SUM(COALESCE(s.weight_override, st.default_weight))
      FROM signals s
      JOIN signal_types st ON s.signal_type_id = st.id
      WHERE s.company_id = target_company_id AND st.category = 'democracy' AND s.verified = true
    ), 0),
    civil_rights_score = COALESCE((
      SELECT SUM(COALESCE(s.weight_override, st.default_weight))
      FROM signals s
      JOIN signal_types st ON s.signal_type_id = st.id
      WHERE s.company_id = target_company_id AND st.category = 'civil_rights' AND s.verified = true
    ), 0),
    labor_score = COALESCE((
      SELECT SUM(COALESCE(s.weight_override, st.default_weight))
      FROM signals s
      JOIN signal_types st ON s.signal_type_id = st.id
      WHERE s.company_id = target_company_id AND st.category = 'labor' AND s.verified = true
    ), 0),
    last_updated = NOW()
  WHERE id = target_company_id;

  -- Update total_score and risk_level
  UPDATE companies SET
    total_score = democracy_score + civil_rights_score + labor_score,
    risk_level = CASE
      WHEN democracy_score + civil_rights_score + labor_score >= 9 THEN 'red'
      WHEN democracy_score + civil_rights_score + labor_score >= 4 THEN 'yellow'
      ELSE 'green'
    END
  WHERE id = target_company_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-recalculate scores when signals change
CREATE OR REPLACE FUNCTION trigger_recalculate_scores()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM recalculate_company_scores(OLD.company_id);
    RETURN OLD;
  ELSE
    PERFORM recalculate_company_scores(NEW.company_id);
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER signals_score_update
AFTER INSERT OR UPDATE OR DELETE ON signals
FOR EACH ROW EXECUTE FUNCTION trigger_recalculate_scores();
