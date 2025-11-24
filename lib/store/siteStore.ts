import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SiteCreationState, SiteData, SiteViewState } from '../types/sitesData'

export const useSiteCreationStore = create<SiteCreationState>()(
 persist(

    (set, get) => ({
    step: 'TYPE',
    siteData: {} as Partial<SiteData>,
    currentStepValid: false,
    nextStep: () => {
    const { step } = get()
      const steps = [
        'TYPE', 'BASIC', 'METADATA', 'UPLOADS', 'REVIEW',
      ] as const
      const currentIndex = steps.indexOf(step)
      if (currentIndex < steps.length - 1) {
        set({ step: steps[currentIndex + 1] })
      } },
    prevStep: () => {
            const { step } = get()
      const steps = [
        'TYPE', 'BASIC', 'METADATA', 'UPLOADS', 'REVIEW',
      ] as const
      const currentIndex = steps.indexOf(step)
      if (currentIndex > 0) {
        set({ step: steps[currentIndex - 1] })
      } },
    addSiteData(data) {
        set(state => ({
        siteData: { ...state.siteData, ...data },
      }))
    },
    updateSiteData: (data: Partial<SiteData>) => {
      set(state => ({
        siteData: { ...state.siteData, ...data },
        }))
    },

    resetForm: () => {}
    }),
    { name: 'site-store-a00001a' }
)
)

export const useSiteStore = create<SiteViewState>()(
  persist(
    (set,get)=>({
      currentSite: null,
      setCurrentSite: siteData => set({currentSite: siteData })
    }),{name: 'site-store-view-a000001a'}
  )
)
