import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for database operations
export const db = {
  // Meetings
  async createMeeting(meetingData) {
    const { data, error } = await supabase
      .from('meetings')
      .insert([meetingData])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getMeetings(userId) {
    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getMeeting(meetingId, userId) {
    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .eq('id', meetingId)
      .eq('user_id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  async updateMeeting(meetingId, updates) {
    const { data, error } = await supabase
      .from('meetings')
      .update(updates)
      .eq('id', meetingId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteMeeting(meetingId) {
    const { error } = await supabase
      .from('meetings')
      .delete()
      .eq('id', meetingId)
    
    if (error) throw error
  },

  // Culture Items
  async getCultureItems() {
    const { data, error } = await supabase
      .from('culture_items')
      .select('*')
      .order('section_id', { ascending: true })
      .order('order_index', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  // Meeting Evaluations
  async getMeetingEvaluations(meetingId) {
    const { data, error } = await supabase
      .from('meeting_evaluations')
      .select(`
        *,
        culture_items (
          id,
          title,
          description,
          section_id,
          order_index
        )
      `)
      .eq('meeting_id', meetingId)
    
    if (error) throw error
    return data || []
  },

  async upsertEvaluation(evaluationData) {
    const { data, error } = await supabase
      .from('meeting_evaluations')
      .upsert(evaluationData, {
        onConflict: 'meeting_id,culture_item_id'
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Sections
  async getSections() {
    const { data, error } = await supabase
      .from('sections')
      .select('*')
      .order('order_index', { ascending: true })
    
    if (error) throw error
    return data || []
  }
}