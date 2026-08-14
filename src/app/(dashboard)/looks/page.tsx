import LooksClient from '@/components/looks/LooksClient'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function LooksPage() {
  const { user, error } = await auth()

  if (error || !user) {
    redirect('/login')
  }

  return <LooksClient />
}
