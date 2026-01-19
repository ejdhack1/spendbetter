import * as dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables:')
  console.error('  NEXT_PUBLIC_SUPABASE_URL')
  console.error('  SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function recalculateAllScores() {
  console.log('\n📊 Recalculating Company Scores\n')
  console.log('================================\n')

  // Get all companies
  const { data: companies, error: companiesError } = await supabase
    .from('companies')
    .select('id, name')

  if (companiesError) {
    console.error('Failed to fetch companies:', companiesError.message)
    process.exit(1)
  }

  // Get all signals with their signal types
  const { data: signals, error: signalsError } = await supabase
    .from('signals')
    .select('company_id, weight_override, signal_type:signal_types(category, default_weight)')

  if (signalsError) {
    console.error('Failed to fetch signals:', signalsError.message)
    process.exit(1)
  }

  console.log(`Found ${companies?.length || 0} companies and ${signals?.length || 0} signals\n`)

  let updated = 0

  for (const company of companies || []) {
    const companySignals = signals?.filter((s) => s.company_id === company.id) || []

    let democracyScore = 0
    let civilRightsScore = 0
    let laborScore = 0

    for (const signal of companySignals) {
      const signalTypeData = signal.signal_type as unknown
      const signalType = Array.isArray(signalTypeData) ? signalTypeData[0] : signalTypeData
      if (!signalType) continue

      const st = signalType as { category: string; default_weight: number }
      const weight = signal.weight_override ?? st.default_weight

      switch (st.category) {
        case 'democracy':
          democracyScore += weight
          break
        case 'civil_rights':
          civilRightsScore += weight
          break
        case 'labor':
          laborScore += weight
          break
      }
    }

    const totalScore = democracyScore + civilRightsScore + laborScore
    const riskLevel = totalScore >= 9 ? 'red' : totalScore >= 4 ? 'yellow' : 'green'

    const { error: updateError } = await supabase
      .from('companies')
      .update({
        democracy_score: democracyScore,
        civil_rights_score: civilRightsScore,
        labor_score: laborScore,
        total_score: totalScore,
        risk_level: riskLevel,
        last_updated: new Date().toISOString(),
      })
      .eq('id', company.id)

    if (updateError) {
      console.error(`  ✗ Failed to update ${company.name}: ${updateError.message}`)
    } else {
      const riskEmoji = riskLevel === 'red' ? '🔴' : riskLevel === 'yellow' ? '🟡' : '🟢'
      console.log(`  ${riskEmoji} ${company.name}: ${totalScore} pts (D:${democracyScore} C:${civilRightsScore} L:${laborScore})`)
      updated++
    }
  }

  console.log('\n================================')
  console.log(`✅ Updated ${updated} companies\n`)
}

recalculateAllScores()
