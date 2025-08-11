import { useCallback } from "react"
import { X } from "lucide-react"

interface GuidelineModalProps {
  isOpen: boolean
  onClose: () => void
}

const GuidelineModal = ({ isOpen, onClose }: GuidelineModalProps) => {
  const clearError = useCallback(() => {
    // placeholder for any cleanup logic
  }, [])

  const handleClose = useCallback(() => {
    clearError()
    onClose()
  }, [onClose, clearError])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Modal */}
      <div className="relative mt-12 bg-muted p-10 rounded-lg mb-12 w-[90%] max-w-lg shadow-lg">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h3 className="text-xl font-bold mb-4">Submission Guidelines</h3>

        {/* Content */}
        <ul className="list-disc md:list-decimal space-y-2 pl-5">
          <li>All submissions must be original or properly attributed with citations.</li>
          <li>Content should be fact-checked and verified from reliable sources.</li>
          <li>Supporting files should be clear, relevant and under 10MB each.</li>
          <li>Submissions will undergo a review process before publication.</li>
          <li>As a contributor you retain copyright of your work but grant us a license to display it.</li>
        </ul>
      </div>
    </div>
  )
}

export default GuidelineModal
