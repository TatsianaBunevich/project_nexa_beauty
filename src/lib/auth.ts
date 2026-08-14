import { createClient } from '@/lib/supabase/server'

export async function auth() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return {
      user: null,
      error: error?.message || 'No authenticated user found',
    }
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || user.email,
    },
    error: null,
  }
}

