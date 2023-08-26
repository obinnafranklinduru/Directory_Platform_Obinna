import { Request, Response, NextFunction } from 'express';
import { MentorService } from '../services/mentor.service';
import ErrorResponse from '../utils/errorResponse';
import {
    mentorDataValidation,
    categoriesArrayValidation,
    categoriesValidation,
    URLValidation,
    mentorUpdateValidation,
} from '../validations/mentor.validation';

const mentorService = new MentorService();

// Create a new mentor
export async function createMentor(req: Request, res: Response, next: NextFunction) {
    try {
        const { firstName, lastName, email } = req.body;

        const mentorData = mentorDataValidation.parse({ firstName, lastName, email });
        
        const mentor = await mentorService.createMentor(mentorData);

        res.status(201).json({
            success: true,
            data: {
                firstName: mentor.firstName,
                lastName: mentor.lastName,
                email: mentor.email,
                avatar: mentor.avatar,
                categories: mentor.categories,
            }
        });
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
}

export async function addMentorCategoryById(req: Request, res: Response, next: NextFunction){
    try {
        const { mentorId } = req.params;

        const { categories } = req.body;

        const categoriesIds = categoriesArrayValidation.parse(categories);

        const mentor = await mentorService.addMentorCategory(mentorId, categoriesIds);
        
        res.status(200).json({
            success: true,
            data: {
                firstName: mentor.firstName,
                lastName: mentor.lastName,
                email: mentor.email,
                avatar: mentor.avatar,
                categories: mentor.categories,
            }
        });
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
}

export async function removeMentorCategoryById(req: Request, res: Response, next: NextFunction){
    try {
        const { mentorId } = req.params;

        const { categoryId } = req.body;

        const result = categoriesValidation.parse(categoryId);

        const mentor = await mentorService.removeMentorCategory(mentorId, result);
        
        res.status(200).json({
            success: true,
            data: {
                firstName: mentor.firstName,
                lastName: mentor.lastName,
                email: mentor.email,
                avatar: mentor.avatar,
                categories: mentor.categories,
            }
        });
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
}

export async function addMentorAvatar(req: Request, res: Response, next: NextFunction){
    try {
        const { mentorId } = req.params;
        const { url } = req.body;

        const avatarUrl = URLValidation.parse(url);

        const mentor = await mentorService.addMentorAvatar(mentorId, avatarUrl);
        
        res.status(200).json({
            success: true,
            data: {
                firstName: mentor.firstName,
                lastName: mentor.lastName,
                email: mentor.email,
                avatar: mentor.avatar,
                categories: mentor.categories,
            }
        });
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
}

// Get all mentors with category and socialLinks populated
export async function getAllMentors(req: Request, res: Response, next: NextFunction){
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;

        const mentors = await mentorService.getAllMentors(page, limit);

        res.status(200).json({ success: true, data: mentors });
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
}

// Get a mentor by their ID with category and socialLinks populated
export async function getMentorById(req: Request, res: Response, next: NextFunction){
    try {
        const { mentorId } = req.params;

        const mentor = await mentorService.getMentorById(mentorId);
        
        res.status(200).json({
            success: true,
            data: {
                firstName: mentor.firstName,
                lastName: mentor.lastName,
                email: mentor.email,
                avatar: mentor.avatar,
                categories: mentor.categories,
            }
        });
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
}

export async function getMentorByCategoryOrName(req: Request, res: Response, next: NextFunction){
    try {
        const { firstName, lastName, categories } = req.query;

        const mentors = await mentorService.getMentorByCategoryOrName(firstName, lastName, categories);
        
        res.status(200).json({ success: true, data: mentors });
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
}

// Update a mentor by their ID
export async function updateMentor(req: Request, res: Response, next: NextFunction){
    try {
        const { mentorId } = req.params;
        const { firstName, lastName, email } = req.body;

        const mentorData = mentorUpdateValidation.parse({ firstName, lastName, email });

        const mentor = await mentorService.updateMentor(mentorId, mentorData);

        res.status(200).json({
            success: true,
            data: {
                firstName: mentor.firstName,
                lastName: mentor.lastName,
                email: mentor.email,
                avatar: mentor.avatar,
                categories: mentor.categories,
            }
        });
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
}

// Delete a mentor by their ID
export async function deleteMentorController(req: Request, res: Response, next: NextFunction){
    try {
        const { mentorId } = req.params;
        
        const result = await mentorService.deleteMentor(mentorId);
        
        res.status(200).json({
            success: result.acknowledged,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
}