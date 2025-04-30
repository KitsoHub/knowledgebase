import { OnboardingFormSchema } from '@/app/utils/schemas/formSchemas/onboardingFormSchema'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { MultiSelect } from '@/app/components/ui/multi-select'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/app/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { Checkbox } from '../ui/checkbox'

// import { createNewOnboarding } from '@/lib/api'
import { redirect } from 'next/navigation'

type OnboardingModalProps = {
    isOpen: boolean
    onClose: () => void
    userEmail?: string
}

export function OnboardingModal({
    isOpen,
    onClose,
    userEmail,
}: OnboardingModalProps) {
    // const clerk = useClerk();
    const [isSubmitting, setIsSubmitting] = useState(false)
    //steps
    const [step, setStep] = useState(1)
    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1)
        }
    }
    const nextStep = async () => {
        if (step === 1) {
            const isValid = await form.trigger('researchPurpose')
            if (isValid) setStep(2)
        } else if (step === 2) {
            const isValid = await form.trigger('organization')
            if (isValid) setStep(3)
        }
    }

    const form = useForm<z.infer<typeof OnboardingFormSchema>>({
        resolver: zodResolver(OnboardingFormSchema),
        defaultValues: {
            researchPurpose: '',
            organization: '',
            interests: [],
            termsAccepted: false,
        },
    })
    // Pre-fill organization if institutional email
    useState(() => {
        if (userEmail && userEmail.includes('.edu')) {
            const domain = userEmail.split('@')[1]
            const orgName =
                domain.split('.')[0].charAt(0).toUpperCase() +
                domain.split('.')[0].slice(1)
            form.setValue('organization', orgName)
        }
    })
    console.log(form)
    console.log(onClose)
    console.log(userEmail, step)
    if (!isOpen) return null
    const interestOptions = [
        { label: 'Indigenous Knowledge', value: 'indigenous-knowledge' },
        { label: 'Artificial Intelligence', value: 'ai' },
        { label: 'Agriculture', value: 'agriculture' },
        { label: 'Climate Change', value: 'climate-change' },
        { label: 'Education', value: 'education' },
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Technology', value: 'technology' },
        { label: 'Cultural Preservation', value: 'cultural-preservation' },
    ]

    const onSubmit = async (data: z.infer<typeof OnboardingFormSchema>) => {
        setIsSubmitting(true)
        try {
            // await createNewOnboarding(data)

            redirect('/dashboard')
        } catch (error) {
            console.error('Error submitting onboarding data:', error,data)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-1 text-red-500  hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Welcome!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Help us personalize your experience by providing a few
                        details.
                    </p>
                </div>

                <div className="mb-4 flex justify-between">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`h-2 w-full ${i < 3 ? 'mr-1' : ''} rounded ${
                                i <= step
                                    ? 'bg-primary'
                                    : 'bg-gray-200 dark:bg-gray-700'
                            } transition-all duration-300`}
                        />
                    ))}
                </div>

                {/* FORM */}
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FormField
                                        control={form.control}
                                        name="researchPurpose"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Purpose of Research
                                                </FormLabel>
                                                <Select
  onValueChange={field.onChange}
  defaultValue={field.value}
>
  <FormControl>
    <SelectTrigger>
      <SelectValue placeholder="Select your research purpose" />
    </SelectTrigger>
  </FormControl>
  <SelectContent>
    <SelectItem value="academic">Academic</SelectItem>
    <SelectItem value="commercial">Commercial</SelectItem>
    <SelectItem value="personal">Personal</SelectItem>
    <SelectItem value="nonprofit">Non-profit</SelectItem>
    <SelectItem value="government">Government</SelectItem>
  </SelectContent>
</Select>

                                                <FormDescription>
                                                    This helps us understand how
                                                    you will use our platform.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>
                            )}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FormField
                                        control={form.control}
                                        name="organization"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Organization (Optional)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Your institution or company"
                                                        {...field}
                                                        autoFocus
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Let us know if you are
                                                    affiliated with an
                                                    organization.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <FormField
                                        control={form.control}
                                        name="interests"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Key Interests
                                                </FormLabel>
                                                <FormControl>
                                                    <MultiSelect
                                                        options={
                                                            interestOptions
                                                        }
                                                        selected={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        placeholder="Select your interests"
                                                        autoFocus
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Select topics you are
                                                    interested in exploring.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        name="termsAccepted"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>
                                                        I accept the{' '}
                                                        <a
                                                            href="/terms"
                                                            className="text-primary underline hover:text-primary/80"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            terms and conditions
                                                        </a>
                                                    </FormLabel>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    ></FormField>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mt-6 flex justify-between">
                            {step > 1 ? (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={prevStep}
                                >
                                    Back
                                </Button>
                            ) : (
                                <div></div>
                            )}

                            {step < 3 ? (
                                <Button type="button" onClick={nextStep}>
                                    Next
                                </Button>
                            ) : (
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting
                                        ? 'Submitting...'
                                        : 'Complete'}
                                </Button>
                            )}
                        </div>
                    </form>
                </Form>
            </motion.div>
        </div>
    )
}
