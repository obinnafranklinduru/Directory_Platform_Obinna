import { z } from 'zod';

import { CategoryModel } from '../models/category.model';

// Custom validator function to check for unique emails
const isUniqueCategory = async (value: string) => {
    const name = value.trim().toLowerCase();
    const exists = await CategoryModel.findOne({ name });
    return !exists;
}

export const categoryValidation = z.object({
    name: z
        .string()
        .min(1)
        .max(255)
        .refine(async (value) => await isUniqueCategory(value), {
            message: 'Category must be unique',
        })
});