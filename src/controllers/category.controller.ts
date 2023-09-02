import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/category.service';
import { categoryValidation } from '../validations/category.validation';

const categoryService = new CategoryService()

// Create a new category
export async function createCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const { name } = req.body;

        const categoryData = await categoryValidation.parseAsync({ name });

        const category = await categoryService.createCategory(categoryData.name);

        res.status(201).json({
            success: true,
            data: {
                name: category.name
            }
        });
    } catch (error) {
        next(error);
    }
}

// Get all categories
export async function getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;

        const categories = await categoryService.getAllCategories(page, limit);

        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        next(error);
    }
}

// Get a category by its ID
export async function getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
        const { categoryId } = req.params;

        const category = await categoryService.getCategoryById(categoryId);
        
        res.status(200).json({
            success: true,
            data: {
                name: category.name
            }
        });
    } catch (error) {
        next(error);
    }
}

// Update a category by its ID
export async function updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const { categoryId } = req.params;
        const { name } = req.body;

        const categoryData = await categoryValidation.parseAsync({ name });

        const category = await categoryService.updateCategory(categoryId, categoryData.name);

        res.status(200).json({
            success: true,
            data: {
                name: category.name
            }
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
}

// Delete a category by its ID
export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const { categoryId } = req.params;

        const result = await categoryService.deleteCategory(categoryId);

        res.status(200).json({
            success: result.acknowledged,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        next(error);
    }
}