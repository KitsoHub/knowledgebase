
import { z } from 'zod';
export const feedbackSchema = z.object({
  itemId: z.string().uuid(),
  category: z.object({
    category: z.enum(['riddle', 'idiom', 'proverb']),
  }),
  feedBackType: z.object({
    feedBackType: z.enum([
      'meaning',
      'translation',
      'options',
      'context',
      'lexical',
    ]),
  }),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be at most 1000 characters'),
  userEmail: z.string().email('Invalid email address').optional(),
});

export type FeedbackFormData = z.infer<typeof feedbackSchema>;
