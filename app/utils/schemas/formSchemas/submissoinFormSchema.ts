import { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fileSchema = z.object({
  name: z.string().min(1, 'File name is required'),
  type: z.string().min(1, 'File type is required'),
  size: z.number().positive('File size must be a positive number'),
  path: z.string().optional(), // Include any additional properties from your File objects
  relativePath: z.string().optional(),
  preview: z.string().optional(),
  progress: z.string().optional(),
})

export const SubmissionFormSchema = z.object({
  articleTitle: z.string().min(1, { message: 'Title is required' }),
  articleCategory: z.string().min(1, {
    message: 'Category is required',
  }),
  articleAbstract: z.string().min(1, { message: 'Abstract is required' }),
  articleContent: z.string().min(1, { message: 'Content is required' }),
  tags: z.string().optional(), // Tags come as a JSON string from the form
  files: z.array(z.string()).optional(), // Uploaded file URLs
  // files: z.array(fileSchema).optional(),
  articleTermsAccepted: z.boolean().refine(value => value, {
    message: 'You must accept the terms',
  }),
})

export type SubmissionFormData = z.infer<typeof SubmissionFormSchema>
