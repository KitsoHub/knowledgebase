import React from 'react'
import { FileText } from 'lucide-react'

const NoApplicationSelected: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
      <FileText className="h-16 w-16 mb-4 opacity-30" />
      <h3 className="text-xl font-medium mb-2">No Application Selected</h3>
      <p>Add applications to your workspace to begin verification</p>
    </div>
  )
}

export default NoApplicationSelected
