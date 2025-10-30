'use client'

import { ReactNode } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { checkUserRole, UserRole } from '@/lib/clerk/roles'

interface RoleGuardProps {
  user: any // You can type this more strictly if you extend Clerk's user object
  allowedRoles: UserRole[]
  children: ReactNode
  fallback?: ReactNode // Optional custom fallback (e.g., "Not Authorized")
}

export default function RoleGuard({
  user,
  allowedRoles,
  children,
  fallback = <p>You are not authorized to view this page.</p>,
}: RoleGuardProps) {
  const router = useRouter()
  const { isSignedIn } = useAuth()

  // If user is not signed in → redirect to login
  if (!isSignedIn) {
    router.push('/sign-in')
    return null
  }

  // Check if user has at least one of the allowed roles
  const hasAccess = checkUserRole(user, allowedRoles)

  if (!hasAccess) {
    return fallback
  }

  return <>{children}</>
}
