import { createClient as createBrowserSupabaseClient } from './supabase/client'

export const createClient = createBrowserSupabaseClient
export const createBrowserClient = createBrowserSupabaseClient
export const supabase = createBrowserSupabaseClient()

