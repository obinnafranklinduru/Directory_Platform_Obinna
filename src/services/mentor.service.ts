import { MentorModel } from '../models/mentor.model';
import { IMentorData, IMentorDocument } from '../interfaces/mentor.interface';
import { CategoryModel } from '../models/category.model';
import ErrorResponse from '../utils/errorResponse';
import { IDeleteResult } from '../interfaces/whitelistEmail.interface';

export class MentorService {
    // Create a new mentor
    async createMentor(mentorData: IMentorData): Promise<IMentorDocument> {
        try {
            const mentor = await MentorModel.create({
                firstName: mentorData.firstName,
                lastName: mentorData.lastName,
                email: mentorData.email,
            });

            return mentor;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    async addMentorCategory(mentorId: string, categoriesIds: string[]): Promise<IMentorDocument> {
        try {
            const mentor: any = MentorModel.findById(mentorId).exec();
            if (!mentor) throw new ErrorResponse('Mentor not found', 404);

            const validCategories = await CategoryModel.find({ _id: { $in: categoriesIds } })
                .populate('categories');

            if (validCategories.length !== categoriesIds.length) throw new ErrorResponse('One or more invalid category IDs', 400);
            
            mentor.categories.push(...categoriesIds); 

            mentor.save();

            return mentor;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    async removeMentorCategory(mentorId: string, categoryId: string): Promise<IMentorDocument> {
        try {
            const mentor: any = MentorModel.findById(mentorId)
                .populate('categories')
                .exec();
            
            if (!mentor) throw new ErrorResponse('Mentor not found', 404);

            const category = await CategoryModel.findById(categoryId);
            if (!category) throw new ErrorResponse('category not found', 404);
            
            const index = mentor.categories.indexOf(category._id);
            if (index !== -1) {
                mentor.categories.splice(index, 1);
                await mentor.save();
            }

            return mentor;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    async addMentorAvatar(mentorId: string, avatarUrl: string): Promise<IMentorDocument> {
        try {
            const mentor = await MentorModel.findById(mentorId)
                .populate('categories')
                .exec();
            
            if (!mentor) throw new ErrorResponse('Mentor not found', 404);

            mentor.avatar = avatarUrl;
            mentor.save();

            return mentor;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    // Get all mentors with category and socialLinks populated
    async getAllMentors(page: number = 1, limit: number = 10): Promise<IMentorDocument[]> {
        try {
            const skip = (page - 1) * limit;

            const mentors = await MentorModel.find({}, '-__v')
                .sort({ firstName: 1 })
                .skip(skip)
                .limit(limit)
                .populate('categories')
                .exec();
            
            if (mentors.length === 0) throw new ErrorResponse('Not mentors found', 404);
            
            return mentors 
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    // Get a mentor by their ID with category and socialLinks populated
    async getMentorById(mentorId: string): Promise<IMentorDocument> {
        try {
            const mentor = await MentorModel.findById(mentorId)
                .populate('categories')
                .exec();

            if (!mentor) throw new ErrorResponse('mentor not found', 404);

            return mentor;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    async getMentorByCategoryOrName(firstName: any, lastName: any, categories: any): Promise<IMentorDocument[]> {
        try {
            let query: any = {};

            if (firstName) {
                query.firstName = { $regex: firstName, $options: 'i' };
            }

            if (lastName) {
                query.lastName = { $regex: lastName, $options: 'i' };
            }

            if (categories) {
                const categoryIds = Array.isArray(categories) ? categories : [categories];
                query.categories = { $in: categoryIds };
            }

            const mentors = await MentorModel.find(query, '-__v')
                .populate('categories')
                .exec();

            if (mentors.length === 0) throw new ErrorResponse('Not mentors found', 404);
            
            return mentors;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    // Update a mentor by their ID
    async updateMentor(mentorId:string, mentorData: IMentorData): Promise<IMentorDocument> {
        try {
            const mentor = await MentorModel.findById(mentorId)
                .populate('categories')
                .exec();

            if (!mentor) throw new ErrorResponse('mentor not found', 404);

            for (const [key, value] of Object.entries(mentorData)) {
                if (value !== undefined) {
                    (mentor as any)[key] = value;
                }
            }

            mentor.save();

            return mentor;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    // Delete a mentor by their ID
    async deleteMentor(mentorId: string): Promise<IDeleteResult> {
        try {
            const mentor: any = MentorModel.findById(mentorId).exec();
            if (!mentor) throw new ErrorResponse('Mentor not found', 404);

            const deleteResult = await MentorModel.deleteOne({ _id: mentor._id }).exec();

            return deleteResult;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }
}