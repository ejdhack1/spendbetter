export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          slug: string
          name: string
          description: string | null
          icon: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          description?: string | null
          icon?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          description?: string | null
          icon?: string | null
          sort_order?: number
          created_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          slug: string
          name: string
          parent_company: string | null
          description: string | null
          website: string | null
          logo_url: string | null
          democracy_score: number
          civil_rights_score: number
          labor_score: number
          total_score: number
          risk_level: 'green' | 'yellow' | 'red'
          last_updated: string
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          parent_company?: string | null
          description?: string | null
          website?: string | null
          logo_url?: string | null
          democracy_score?: number
          civil_rights_score?: number
          labor_score?: number
          total_score?: number
          risk_level?: 'green' | 'yellow' | 'red'
          last_updated?: string
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          parent_company?: string | null
          description?: string | null
          website?: string | null
          logo_url?: string | null
          democracy_score?: number
          civil_rights_score?: number
          labor_score?: number
          total_score?: number
          risk_level?: 'green' | 'yellow' | 'red'
          last_updated?: string
          created_at?: string
        }
      }
      company_categories: {
        Row: {
          company_id: string
          category_id: string
          is_primary: boolean
        }
        Insert: {
          company_id: string
          category_id: string
          is_primary?: boolean
        }
        Update: {
          company_id?: string
          category_id?: string
          is_primary?: boolean
        }
      }
      signal_types: {
        Row: {
          id: string
          code: string
          name: string
          description: string | null
          category: 'democracy' | 'civil_rights' | 'labor'
          default_weight: number
          sort_order: number
        }
        Insert: {
          id?: string
          code: string
          name: string
          description?: string | null
          category: 'democracy' | 'civil_rights' | 'labor'
          default_weight: number
          sort_order?: number
        }
        Update: {
          id?: string
          code?: string
          name?: string
          description?: string | null
          category?: 'democracy' | 'civil_rights' | 'labor'
          default_weight?: number
          sort_order?: number
        }
      }
      signals: {
        Row: {
          id: string
          company_id: string
          signal_type_id: string
          title: string
          description: string | null
          evidence_url: string
          evidence_source: string | null
          evidence_date: string | null
          weight_override: number | null
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          signal_type_id: string
          title: string
          description?: string | null
          evidence_url: string
          evidence_source?: string | null
          evidence_date?: string | null
          weight_override?: number | null
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          signal_type_id?: string
          title?: string
          description?: string | null
          evidence_url?: string
          evidence_source?: string | null
          evidence_date?: string | null
          weight_override?: number | null
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      alternatives: {
        Row: {
          id: string
          slug: string
          name: string
          description: string | null
          website: string | null
          type: 'national' | 'local_tip' | 'cooperative' | null
          practicality: 'easy' | 'moderate' | 'niche' | null
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          description?: string | null
          website?: string | null
          type?: 'national' | 'local_tip' | 'cooperative' | null
          practicality?: 'easy' | 'moderate' | 'niche' | null
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          description?: string | null
          website?: string | null
          type?: 'national' | 'local_tip' | 'cooperative' | null
          practicality?: 'easy' | 'moderate' | 'niche' | null
          created_at?: string
        }
      }
      company_alternatives: {
        Row: {
          id: string
          company_id: string
          alternative_id: string
          category_id: string | null
          rationale: string | null
          sort_order: number
        }
        Insert: {
          id?: string
          company_id: string
          alternative_id: string
          category_id?: string | null
          rationale?: string | null
          sort_order?: number
        }
        Update: {
          id?: string
          company_id?: string
          alternative_id?: string
          category_id?: string | null
          rationale?: string | null
          sort_order?: number
        }
      }
      submissions: {
        Row: {
          id: string
          company_name: string
          company_id: string | null
          signal_type_id: string | null
          description: string
          evidence_url: string
          submitter_email: string | null
          status: 'pending' | 'approved' | 'rejected'
          reviewer_notes: string | null
          reviewed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          company_name: string
          company_id?: string | null
          signal_type_id?: string | null
          description: string
          evidence_url: string
          submitter_email?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          reviewer_notes?: string | null
          reviewed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          company_name?: string
          company_id?: string | null
          signal_type_id?: string | null
          description?: string
          evidence_url?: string
          submitter_email?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          reviewer_notes?: string | null
          reviewed_at?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types for easier use
export type Category = Database['public']['Tables']['categories']['Row']
export type Company = Database['public']['Tables']['companies']['Row']
export type Signal = Database['public']['Tables']['signals']['Row']
export type SignalType = Database['public']['Tables']['signal_types']['Row']
export type Alternative = Database['public']['Tables']['alternatives']['Row']
export type CompanyAlternative = Database['public']['Tables']['company_alternatives']['Row']
export type Submission = Database['public']['Tables']['submissions']['Row']

export type RiskLevel = 'green' | 'yellow' | 'red'
export type SignalCategory = 'democracy' | 'civil_rights' | 'labor'
export type AlternativeType = 'national' | 'local_tip' | 'cooperative'
export type Practicality = 'easy' | 'moderate' | 'niche'
