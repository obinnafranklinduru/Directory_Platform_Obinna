import { z } from 'zod';

export const mentorDataValidation = z.object({
    firstName: z.string().nonempty('First name must not be empty'),
    lastName: z.string().nonempty('Last name must not be empty'),
    email: z.string().nonempty('Email must not be empty').email('Invalid email format')
});

export const categoriesArrayValidation = z.array(z.string());

export const categoriesValidation = z.string().nonempty('CategoryId must not be empty');

export const URLValidation = z.string().url().nonempty('URL must not be empty');

export const mentorUpdateValidation = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email('Invalid email format').optional()
});
