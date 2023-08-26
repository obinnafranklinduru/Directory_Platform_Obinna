import { Schema, model } from 'mongoose';
import { ICategoryDocument } from '../interfaces/category.interface';

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
});

export const CategoryModel = model<ICategoryDocument>('Category', categorySchema);