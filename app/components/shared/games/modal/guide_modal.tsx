import { useCallback } from 'react'
import { X } from 'lucide-react'

interface GuidelineModalProps {
  isOpen: boolean
  onClose: () => void
}

const GuidelineModal = ({ isOpen, onClose }: GuidelineModalProps) => {
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Modal Box */}
      <div className="relative mt-12 bg-muted p-10 rounded-lg mb-12 max-w-lg w-full shadow-lg">
        {/* X Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h3 className="text-xl font-bold mb-4"> Guidelines</h3>
        <ul className="list-disc md:list-decimal space-y-2 pl-5">
          <li>
            Names must not contain vulgar or inappropriate language, must not be
            excessively long, and violations will result in penalties for not
            following this guideline.
          </li>
        </ul>
      </div>
    </div>
  )
}

export default GuidelineModal
