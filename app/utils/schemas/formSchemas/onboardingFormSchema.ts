import { z } from 'zod'

export const OnboardingFormSchema = z.object({
  researchPurpose: z.string({
    required_error: 'Please select a research purpose',
  }),
  organization: z.string().optional(),
  interests: z
    .array(z.string())
    .min(1, { message: 'Please select at least one interest' }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
})
