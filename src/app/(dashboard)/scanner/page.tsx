import ScannerClient from '@/components/scanner/ScannerClient'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function ScannerPage() {
  const { user, error } = await auth()
  if (error || !user) redirect('/login')

  return <ScannerClient userId={user.id} />
}
