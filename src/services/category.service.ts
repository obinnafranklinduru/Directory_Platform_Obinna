import { CategoryModel } from '../models/category.model';
import { ICategoryDocument } from '../interfaces/category.interface';
import { IDeleteResult } from '../interfaces/whitelistEmail.interface';
import ErrorResponse from '../utils/errorResponse';

export class CategoryService {
    // Create a new category
    async createCategory(name: string): Promise<ICategoryDocument> {
        try {
            const category = await CategoryModel.create({ name });

            return category
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    // Get all categories
    async getAllCategories(page: number = 1, limit: number = 10): Promise<ICategoryDocument[]> {
        try {
            const skip = (page - 1) * limit;

            const category = await CategoryModel.find({}, '-__v')
                .sort({ name: 1 })
                .skip(skip)
                .limit(limit)
                .exec();

            if (category.length === 0) throw new ErrorResponse('Categories is not found', 404);

            return category;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    // Get a category by its ID
    async getCategoryById(categoryId: string): Promise<ICategoryDocument> {
        try {
            const category = await CategoryModel.findById(categoryId).exec();

            if (!category) throw new ErrorResponse('Category not found', 404);
            
            return category;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    // Update a category by its ID
    async updateCategory(categoryId: string, name: string): Promise<ICategoryDocument> {
        try {
            const category = await CategoryModel.findById(categoryId).exec();

            if (!category) throw new ErrorResponse('Category not found', 404);
            
            category.name = name;
            await category.save();
            
            return category;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    // Delete a category by its ID
    async deleteCategory(categoryId: string): Promise<IDeleteResult> {
        try {
            const category = await CategoryModel.findById(categoryId);

            if (!category) throw new ErrorResponse('Category not found', 404);

            const deleteResult = await CategoryModel.deleteOne({ name: category.name }).exec();
            
            return deleteResult;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }
}