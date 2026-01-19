import * as dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { parse } from 'csv-parse/sync'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config({ path: ".env.local" });
// Initialize Supabase client with service role for admin access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables:')
  console.error('  NEXT_PUBLIC_SUPABASE_URL')
  console.error('  SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const DATA_DIR = path.join(__dirname, '..', 'data')

function readCSV<T>(filename: string): T[] {
  const filepath = path.join(DATA_DIR, filename)
  const content = fs.readFileSync(filepath, 'utf-8')
  return parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  })
}

async function importCategories() {
  console.log('Importing categories...')
  const categories = readCSV<{
    slug: string
    name: string
    description: string
    icon: string
    sort_order: string
  }>('categories.csv')

  const { error } = await supabase.from('categories').upsert(
    categories.map((c) => ({
      slug: c.slug,
      name: c.name,
      description: c.description,
      icon: c.icon,
      sort_order: parseInt(c.sort_order, 10),
    })),
    { onConflict: 'slug' }
  )

  if (error) throw new Error(`Categories import failed: ${error.message}`)
  console.log(`  ✓ Imported ${categories.length} categories`)
}

async function importSignalTypes() {
  console.log('Importing signal types...')
  const signalTypes = readCSV<{
    code: string
    name: string
    description: string
    category: string
    default_weight: string
  }>('signal_types.csv')

  const { error } = await supabase.from('signal_types').upsert(
    signalTypes.map((st, index) => ({
      code: st.code,
      name: st.name,
      description: st.description,
      category: st.category,
      default_weight: parseInt(st.default_weight, 10),
      sort_order: index,
    })),
    { onConflict: 'code' }
  )

  if (error) throw new Error(`Signal types import failed: ${error.message}`)
  console.log(`  ✓ Imported ${signalTypes.length} signal types`)
}

async function importCompanies() {
  console.log('Importing companies...')
  const companies = readCSV<{
    slug: string
    name: string
    parent_company: string
    description: string
    website: string
    primary_category: string
  }>('companies.csv')

  // First, import companies
  const { error } = await supabase.from('companies').upsert(
    companies.map((c) => ({
      slug: c.slug,
      name: c.name,
      parent_company: c.parent_company || null,
      description: c.description,
      website: c.website,
    })),
    { onConflict: 'slug' }
  )

  if (error) throw new Error(`Companies import failed: ${error.message}`)
  console.log(`  ✓ Imported ${companies.length} companies`)

  // Then, create company-category relationships
  console.log('  Creating company-category relationships...')

  // Get all categories and companies for ID lookup
  const { data: categoriesData } = await supabase.from('categories').select('id, slug')
  const { data: companiesData } = await supabase.from('companies').select('id, slug')

  const categoryMap = new Map(categoriesData?.map((c) => [c.slug, c.id]) || [])
  const companyMap = new Map(companiesData?.map((c) => [c.slug, c.id]) || [])

  const companyCategories = companies
    .filter((c) => c.primary_category && categoryMap.has(c.primary_category))
    .map((c) => ({
      company_id: companyMap.get(c.slug)!,
      category_id: categoryMap.get(c.primary_category)!,
      is_primary: true,
    }))

  if (companyCategories.length > 0) {
    const { error: ccError } = await supabase
      .from('company_categories')
      .upsert(companyCategories, { onConflict: 'company_id,category_id' })

    if (ccError) throw new Error(`Company categories import failed: ${ccError.message}`)
    console.log(`  ✓ Created ${companyCategories.length} company-category links`)
  }
}

async function importSignals() {
  console.log('Importing signals...')
  const signals = readCSV<{
    company_slug: string
    signal_type_code: string
    title: string
    description: string
    evidence_url: string
    evidence_source: string
    evidence_date: string
  }>('signals.csv')

  // Get lookups
  const { data: companiesData } = await supabase.from('companies').select('id, slug')
  const { data: signalTypesData } = await supabase.from('signal_types').select('id, code')

  const companyMap = new Map(companiesData?.map((c) => [c.slug, c.id]) || [])
  const signalTypeMap = new Map(signalTypesData?.map((st) => [st.code, st.id]) || [])

  const signalsToInsert = signals
    .filter((s) => companyMap.has(s.company_slug) && signalTypeMap.has(s.signal_type_code))
    .map((s) => ({
      company_id: companyMap.get(s.company_slug)!,
      signal_type_id: signalTypeMap.get(s.signal_type_code)!,
      title: s.title,
      description: s.description,
      evidence_url: s.evidence_url,
      evidence_source: s.evidence_source,
      evidence_date: s.evidence_date || null,
      verified: true, // Seed data is pre-verified
    }))

  // Delete existing signals and insert fresh (to avoid duplicates on re-run)
  await supabase.from('signals').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  const { error } = await supabase.from('signals').insert(signalsToInsert)

  if (error) throw new Error(`Signals import failed: ${error.message}`)
  console.log(`  ✓ Imported ${signalsToInsert.length} signals`)
}

async function importAlternatives() {
  console.log('Importing alternatives...')
  const alternatives = readCSV<{
    slug: string
    name: string
    description: string
    website: string
    type: string
    practicality: string
    for_categories: string
  }>('alternatives.csv')

  // Import alternatives
  const { error } = await supabase.from('alternatives').upsert(
    alternatives.map((a) => ({
      slug: a.slug,
      name: a.name,
      description: a.description,
      website: a.website || null,
      type: a.type || null,
      practicality: a.practicality || null,
    })),
    { onConflict: 'slug' }
  )

  if (error) throw new Error(`Alternatives import failed: ${error.message}`)
  console.log(`  ✓ Imported ${alternatives.length} alternatives`)

  // Create company-alternative relationships based on categories
  console.log('  Creating company-alternative relationships...')

  const { data: categoriesData } = await supabase.from('categories').select('id, slug')
  const { data: companiesData } = await supabase
    .from('companies')
    .select('id, company_categories(category_id)')
  const { data: alternativesData } = await supabase.from('alternatives').select('id, slug')

  const categoryMap = new Map(categoriesData?.map((c) => [c.slug, c.id]) || [])
  const alternativeMap = new Map(alternativesData?.map((a) => [a.slug, a.id]) || [])

  // Build company to category mapping
  const companyCategoryMap = new Map<string, string[]>()
  companiesData?.forEach((company) => {
    const categoryIds = company.company_categories?.map((cc: { category_id: string }) => cc.category_id) || []
    companyCategoryMap.set(company.id, categoryIds)
  })

  const companyAlternatives: {
    company_id: string
    alternative_id: string
    category_id: string
    rationale: string
    sort_order: number
  }[] = []

  // For each alternative, link it to companies in the same category
  for (const alt of alternatives) {
    const altId = alternativeMap.get(alt.slug)
    const categoryId = categoryMap.get(alt.for_categories)

    if (!altId || !categoryId) continue

    // Find companies in this category
    companiesData?.forEach((company, index) => {
      const companyCategories = companyCategoryMap.get(company.id) || []
      if (companyCategories.includes(categoryId)) {
        companyAlternatives.push({
          company_id: company.id,
          alternative_id: altId,
          category_id: categoryId,
          rationale: `Consider ${alt.name} as an alternative`,
          sort_order: index,
        })
      }
    })
  }

  if (companyAlternatives.length > 0) {
    // Clear existing and insert fresh
    await supabase
      .from('company_alternatives')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')

    const { error: caError } = await supabase.from('company_alternatives').insert(companyAlternatives)

    if (caError) throw new Error(`Company alternatives import failed: ${caError.message}`)
    console.log(`  ✓ Created ${companyAlternatives.length} company-alternative links`)
  }
}

async function recalculateAllScores() {
  console.log('Recalculating company scores...')

  const { data: companies } = await supabase.from('companies').select('id')

  for (const company of companies || []) {
    await supabase.rpc('recalculate_company_scores', { target_company_id: company.id })
  }

  console.log(`  ✓ Recalculated scores for ${companies?.length || 0} companies`)
}

async function main() {
  console.log('\n🌱 SpendBetter Seed Data Import\n')
  console.log('================================\n')

  try {
    await importCategories()
    await importSignalTypes()
    await importCompanies()
    await importSignals()
    await importAlternatives()
    await recalculateAllScores()

    console.log('\n================================')
    console.log('✅ Import completed successfully!\n')
  } catch (error) {
    console.error('\n❌ Import failed:', error)
    process.exit(1)
  }
}

main()
