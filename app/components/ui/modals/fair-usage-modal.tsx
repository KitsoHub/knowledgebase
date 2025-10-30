import { X } from 'lucide-react'
import { Button } from '../button'
import { on } from 'events'
import { fairUsagePolicy } from '@/lib/hero_data'
import Link from 'next/link'
import { fa } from 'zod/v4/locales'
import { useCallback } from 'react'

interface FairUsageModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FairUsageModal({
  isOpen,
  onClose,
}: FairUsageModalProps) {
  const handleAcknowledgement = () => {
    console.log('Acknowledgement received')
    // Logic to handle the acknowledgement can be added here
  }

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  if (!isOpen) return null
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      id="fairUsageModal"
      aria-labelledby="fairUsageModalLabel"
      aria-hidden="true"
    >
      <div className="relative w-full max-w-screen-md mx-4 bg-white rounded-2xl shadow-2xl border border-sky-100 max-h-[90vh] overflow-y-auto">
        <div className="relative p-10 pb-4">
          {/* Header */}
          <div className="relative">
            <h2 className="text-2xl font-bold mb-4" id="fairUsageModalLabel">
              {fairUsagePolicy.title}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="absolute top-4 right-4 h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
              disabled={!isOpen}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Modal body */}
          <div className="space-y-4">
            <p>{fairUsagePolicy.paragraphs[0].text}</p>
            <ul className="list-disc md:list-decimal space-y-2">
              <li>{fairUsagePolicy.paragraphs[1].text}</li>
              <li>{fairUsagePolicy.paragraphs[2].text}</li>
              <li>{fairUsagePolicy.paragraphs[3].text}</li>
            </ul>
            <p>
              {fairUsagePolicy.learnMore[0].text}
              <Link
                href={`${fairUsagePolicy.learnMore[0].link}`}
                className="ml-1 text-blue-600 underline"
              >
                {fairUsagePolicy.learnMore[0].title}
              </Link>
            </p>
          </div>
          <div className="flex flex-col gap-3 mt-6">
            <Button
              size="lg"
              variant="outline"
              className="text-base rounded-3xl"
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              type="button"
              className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              onClick={handleAcknowledgement}
            >
              {' '}
              I acknowledge this, continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
