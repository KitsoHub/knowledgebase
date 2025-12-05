'use client'

import { ReactNode } from 'react'


interface LanguagesBaseProps {
  children: ReactNode
  allowedRoles?: string[]
}

export default function LanguagesBase({
  children,
  allowedRoles,
}: LanguagesBaseProps) {
  //const { user } = useUser();

  return (
    <div className="flex-1 flex-col space-y-4 p-4 pt-6 md:p-8">{children}</div>
  )
}
