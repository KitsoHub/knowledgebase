import { PhoneCall, PhoneCallIcon, PhoneIcon, X } from 'lucide-react'
import { Button } from '../button'

import { contactUsData } from '@/lib/hero_data'
import { useCallback } from 'react'

interface ContactUsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactUsModal({
  isOpen,
  onClose,
}: ContactUsModalProps) {
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  if (!isOpen) return null
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      id="contactUsModal"
      aria-labelledby="contactUsModalLabel"
      aria-hidden="true"
    >
      <div className="relative w-full max-w-screen-md mx-4 bg-white rounded-2xl shadow-2xl border border-sky-100 max-h-[90vh] overflow-y-auto">
        <div className="relative p-10 pb-4">
          {/* Header */}
          <div className="relative ">
            <h2
              className="text-2xl text-blue-300 font-bold mb-4"
              id="contactUsModalLabel"
            >
              {contactUsData.title}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="absolute top-4 right-4 h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-red-600 rounded-full"
              disabled={!isOpen}
            >
              <X className="h-4 w-4 " />
            </Button>
          </div>

          {/* Modal body */}

          {contactUsData.personnel.map((person, index) => (
            <div key={index} className="mb-6 last:mb-0 text-black">
              <h3 className="text-lg font-semibold">{person.role}</h3>
              <p className="mt-1">{person.name}</p>
              <p className="mt-1">
                <span>Phone: </span>
                {person.phone ? (
                  <a
                    href={`tel:${person.phone}`}
                    className="text-blue-600 underline"
                  >
                    {person.phone}
                  </a>
                ) : (
                  'N/A'
                )}
              </p>
              <p className="mt-1">
                Email:{' '}
                <a
                  href={`mailto
:${person.emailAddress}`}
                  className="text-blue-600 underline"
                >
                  {person.emailAddress}
                </a>
              </p>
            </div>
          ))}

          <div className="flex flex-col gap-3 mt-6">
            <Button
              size="lg"
              variant="outline"
              className="text-base text-black rounded-3xl"
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
