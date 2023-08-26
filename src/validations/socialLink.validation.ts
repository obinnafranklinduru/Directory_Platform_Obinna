import { z } from 'zod';

export const socialLinkValidation = z.object({
    behance: z.string().url().optional(),
    twitter: z.string().url().optional(),
    instagram: z.string().url().optional(),
    website: z.string().url().optional(),
    userId: z.string().url(),
});