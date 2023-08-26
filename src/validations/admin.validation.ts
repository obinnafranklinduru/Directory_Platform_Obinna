import * as z from 'zod';

export const emailValidation = z
    .string()
    .nonempty('Email must not be empty')
    .email('Invalid email format');


export const updateAdminValidation = z.object({
    displayName: z.string().optional(),
    avatar: z.string().url().optional(),
});