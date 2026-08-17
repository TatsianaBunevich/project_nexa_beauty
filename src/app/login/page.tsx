'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const key = process.env.NEXT_PUBLIC_ADMIN_KEY || process.env.ADMIN_KEY || ''
  const router = useRouter()
  const [authMode, setAuthMode] = React.useState<'signIn' | 'signUp'>('signIn')
  const [session, setSession] = React.useState<any>(null)
  const [email, setEmail] = React.useState('admin@gmail.com')
  const [password, setPassword] = React.useState(key)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient()
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
    }
    checkSession()
  }, [])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      if (authMode === 'signIn') {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (authError) throw authError
      } else {
        const { error: authError } = await supabase.auth.signUp({
          email,
          password,
        })
        if (authError) throw authError
      }

      router.push('/collection')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      setSession(null)
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign out')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md ring-0">
        {session ? (
          <CardContent className="my-4 flex flex-col items-center justify-center space-y-4 py-10 text-center">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">
                Welcome back!
              </CardTitle>
              <CardDescription>
                You are already signed in to Nexa Beauty.
              </CardDescription>
            </div>
            <div className="flex w-full flex-col gap-2">
              <Button
                className="w-full"
                onClick={() => router.push('/dashboard')}
              >
                Go to Dashboard
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleSignOut}
                disabled={isLoading}
              >
                {isLoading ? 'Signing out...' : 'Sign Out'}
              </Button>
            </div>
          </CardContent>
        ) : (
          <>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">
                {authMode === 'signIn'
                  ? 'Login to Nexa Beauty'
                  : 'Create an Account'}
              </CardTitle>
              <CardDescription>
                {authMode === 'signIn'
                  ? 'Enter your credentials to access your beauty collection'
                  : 'Join Nexa Beauty and start organizing your cosmetics'}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleAuth}>
              <CardContent className="my-4 space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <p className="text-center text-sm text-destructive">
                    {error}
                  </p>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-4 bg-inherit">
                <Button
                  type="submit"
                  className="h-10 w-full"
                  disabled={isLoading}
                >
                  {isLoading
                    ? authMode === 'signIn'
                      ? 'Signing in...'
                      : 'Creating account...'
                    : authMode === 'signIn'
                      ? 'Sign In'
                      : 'Sign Up'}
                </Button>
                <button
                  type="button"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  onClick={() =>
                    setAuthMode(authMode === 'signIn' ? 'signUp' : 'signIn')
                  }
                >
                  {authMode === 'signIn'
                    ? "Don't have an account? Sign Up"
                    : 'Already have an account? Sign In'}
                </button>
              </CardFooter>
            </form>
          </>
        )}
      </Card>
    </div>
  )
}
