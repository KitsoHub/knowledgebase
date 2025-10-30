export type UserRole = 'admin' | 'moderator' | 'member' | 'viewer'

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  admin: 3,
  moderator: 2,
  member: 1,
  viewer: 0,
}

// Utility to check if user has allowed role(s)
export function checkUserRole(user: any, allowedRoles: UserRole[]): boolean {
  if (!user || !user.publicMetadata) return false

  const role = user.publicMetadata.role as UserRole | undefined
  if (!role) return false

  return allowedRoles.includes(role)
}
