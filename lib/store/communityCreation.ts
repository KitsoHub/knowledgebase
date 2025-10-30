import { CommunityCreationState, CommunityIdentity } from './../types/community'
import { create } from 'zustand'

export const useCommunityCreationStore = create<CommunityCreationState>(
  (set, get) => ({
    step: 'TYPE',
    communityData: {} as Partial<CommunityIdentity>,
    currentStepValid: false,
    nextStep: () => {
      const { step } = get()
      const steps = [
        'TYPE',
        'BASIC',
        'GOVERNANCE',
        'PROTOCOLS',
        'REVIEW',
      ] as const
      const currentIndex = steps.indexOf(step)
      if (currentIndex < steps.length - 1) {
        set({ step: steps[currentIndex + 1] })
      }
    },
    prevStep: () => {
      const { step } = get()
      const steps = [
        'TYPE',
        'BASIC',
        'GOVERNANCE',
        'PROTOCOLS',
        'REVIEW',
      ] as const
      const currentIndex = steps.indexOf(step)
      if (currentIndex > 0) {
        set({ step: steps[currentIndex - 1] })
      }
    },

    updateCommunityData: (data: Partial<CommunityIdentity>) => {
      set(state => ({
        communityData: { ...state.communityData, ...data },
      }))
    },

    resetForm: () => {
      set({
        step: 'TYPE',
        communityData: {} as Partial<CommunityIdentity>,
        currentStepValid: false,
      })
    },
  })
)
