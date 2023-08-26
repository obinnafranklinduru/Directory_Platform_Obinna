import { z } from 'zod';
import { WhitelistEmailModel } from '../models/whitelistEmail.model';

// Custom validator function to check for unique emails
const isUniqueEmail = async (value: string) => {
    const email = value.trim().toLowerCase();
    const exists = await WhitelistEmailModel.findOne({ email });
    return !exists;
}

export const emailCreationValidation = z.object({
    email: z.string()
        .nonempty('Email must not be empty')
        .email('Invalid email format')
        .refine(async (value) => await isUniqueEmail(value), {
            message: 'Email must be unique',
        })
});