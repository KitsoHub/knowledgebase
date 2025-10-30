'use client'

import { ReactNode } from 'react'
// { useUser } from "@clerk/nextjs";

interface AdminBaseProps {
  children: ReactNode
  allowedRoles?: string[]
}

export default function AdminBase({ children, allowedRoles }: AdminBaseProps) {
  //const { user } = useUser();

  return (
    <div className="flex-1 flex-col space-y-4 p-4 pt-6 md:p-8">{children}</div>
  )
}
