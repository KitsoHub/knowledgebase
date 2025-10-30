'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import type { Application } from '@/lib/data'

type DndContextType = {
  moveToWorkspace: (application: Application) => void
  workspaceApplications: Application[]
}

const DndContext = createContext<DndContextType | undefined>(undefined)

export function DndContextProvider({ children }: { children: ReactNode }) {
  const [workspaceApplications, setWorkspaceApplications] = useState<
    Application[]
  >([])

  const moveToWorkspace = (application: Application) => {
    setWorkspaceApplications(prev => {
      // Check if application is already in workspace
      if (prev.some(app => app.id === application.id)) {
        return prev
      }
      return [...prev, { ...application, status: 'Verification' }]
    })
  }

  return (
    <DndContext.Provider value={{ moveToWorkspace, workspaceApplications }}>
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </DndContext.Provider>
  )
}

export function useDnd() {
  const context = useContext(DndContext)
  if (context === undefined) {
    throw new Error('useDnd must be used within a DndContextProvider')
  }
  return context
}
