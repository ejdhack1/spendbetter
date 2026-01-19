import { createClient } from '@/lib/supabase/server'
import type {
  Category,
  Company,
  Signal,
  SignalType,
  Alternative
} from '@/types/database'

export type CompanyWithCategories = Company & {
  categories: Category[]
}

export type SignalWithType = Signal & {
  signal_type: SignalType
}

export type AlternativeWithDetails = Alternative & {
  rationale?: string | null
}

export type CompanyWithDetails = Company & {
  categories: Category[]
  signals: SignalWithType[]
  alternatives: AlternativeWithDetails[]
}

// Helper type for Supabase query results
type CompanyRow = Company & {
  company_categories: { category: Category }[]
}

type CompanyDetailRow = Company & {
  company_categories: { category: Category }[]
  signals: (Signal & { signal_type: SignalType })[]
  company_alternatives: { alternative: Alternative; rationale: string | null }[]
}

function transformCompanyRow(row: CompanyRow): CompanyWithCategories {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    parent_company: row.parent_company,
    description: row.description,
    website: row.website,
    logo_url: row.logo_url,
    democracy_score: row.democracy_score,
    civil_rights_score: row.civil_rights_score,
    labor_score: row.labor_score,
    total_score: row.total_score,
    risk_level: row.risk_level,
    last_updated: row.last_updated,
    created_at: row.created_at,
    categories: row.company_categories.map(cc => cc.category)
  }
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order')

  if (error) throw error
  return data || []
}

export async function getCompanies(): Promise<CompanyWithCategories[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('companies')
    .select(`
      *,
      company_categories!inner (
        category:categories (*)
      )
    `)
    .order('name')

  if (error) throw error
  if (!data) return []

  return data.map(row => transformCompanyRow(row as unknown as CompanyRow))
}

export async function getCompanyBySlug(slug: string): Promise<CompanyWithDetails | null> {
  const supabase = await createClient()

  const { data: row, error: companyError } = await supabase
    .from('companies')
    .select(`
      *,
      company_categories (
        category:categories (*)
      ),
      signals (
        *,
        signal_type:signal_types (*)
      ),
      company_alternatives (
        rationale,
        alternative:alternatives (*)
      )
    `)
    .eq('slug', slug)
    .single()

  if (companyError || !row) return null

  const data = row as unknown as CompanyDetailRow

  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    parent_company: data.parent_company,
    description: data.description,
    website: data.website,
    logo_url: data.logo_url,
    democracy_score: data.democracy_score,
    civil_rights_score: data.civil_rights_score,
    labor_score: data.labor_score,
    total_score: data.total_score,
    risk_level: data.risk_level,
    last_updated: data.last_updated,
    created_at: data.created_at,
    categories: data.company_categories.map(cc => cc.category),
    signals: data.signals.map(s => ({
      ...s,
      signal_type: s.signal_type
    })),
    alternatives: data.company_alternatives.map(ca => ({
      ...ca.alternative,
      rationale: ca.rationale
    }))
  }
}

export async function getCompaniesByCategory(categorySlug: string): Promise<{
  category: Category | null
  companies: CompanyWithCategories[]
}> {
  const supabase = await createClient()

  const { data: categoryData } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', categorySlug)
    .single()

  if (!categoryData) {
    return { category: null, companies: [] }
  }

  const category = categoryData as Category

  const { data: companyLinks, error: linksError } = await supabase
    .from('company_categories')
    .select(`
      company:companies (
        *,
        company_categories (
          category:categories (*)
        )
      )
    `)
    .eq('category_id', category.id)

  if (linksError) throw linksError
  if (!companyLinks) return { category, companies: [] }

  type CompanyLinkRow = { company: CompanyRow }
  const companies = (companyLinks as unknown as CompanyLinkRow[]).map(link => {
    return transformCompanyRow(link.company)
  })

  return { category, companies }
}

export async function searchCompanies(query: string): Promise<CompanyWithCategories[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('companies')
    .select(`
      *,
      company_categories (
        category:categories (*)
      )
    `)
    .ilike('name', `%${query}%`)
    .order('name')
    .limit(20)

  if (error) throw error
  if (!data) return []

  return data.map(row => transformCompanyRow(row as unknown as CompanyRow))
}

export async function getAlternativesByCategory(categorySlug: string): Promise<Alternative[]> {
  const supabase = await createClient()

  const { data: categoryResult } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single()

  if (!categoryResult) return []

  const categoryId = (categoryResult as { id: string }).id

  const { data, error } = await supabase
    .from('company_alternatives')
    .select(`
      alternative:alternatives (*)
    `)
    .eq('category_id', categoryId)

  if (error) throw error
  if (!data) return []

  type AltRow = { alternative: Alternative }
  const alternatives = (data as unknown as AltRow[]).map(ca => ca.alternative)
  const uniqueAlternatives = Array.from(
    new Map(alternatives.map(a => [a.id, a])).values()
  )

  return uniqueAlternatives
}

export async function getRecentlyFlaggedCompanies(limit = 5): Promise<CompanyWithCategories[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('companies')
    .select(`
      *,
      company_categories (
        category:categories (*)
      )
    `)
    .in('risk_level', ['yellow', 'red'])
    .order('last_updated', { ascending: false })
    .limit(limit)

  if (error) throw error
  if (!data) return []

  return data.map(row => transformCompanyRow(row as unknown as CompanyRow))
}
