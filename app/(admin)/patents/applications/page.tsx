'use client'
import ApplicationQueue from '@/app/components/shared/patent/ApplicationQueue'
import PatentOverMetrics from '@/app/components/shared/patent/patent-metrics'
import { useToast } from '@/app/hooks/use-toast'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'

export default function ApplicationsOverview() {
  const { toast } = useToast()

  // Handle the drag and drop between components
  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result

    // Dropped outside of a droppable area
    if (!destination) return

    // If source and destination are the same, do nothing
    if (source.droppableId === destination.droppableId) return

    // Handle dropping from queue to workspace
    if (
      source.droppableId === 'application-queue' &&
      destination.droppableId === 'workspace'
    ) {
      toast({
        title: 'Application Added to Workspace',
        description: `Application ${draggableId} has been moved to verification workspace.`,
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 space-y-4 p-4 md:p-8">
        {/* metrics */}
        {/* application queue */}
{/*
        <PatentOverMetrics /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <ApplicationQueue />
          </DragDropContext>
        </div>
      </main>
    </div>
  )
}
