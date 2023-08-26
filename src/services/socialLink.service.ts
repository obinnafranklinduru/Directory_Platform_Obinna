import { SocialLinkModel } from '../models/socialLink.model';
import { MentorModel } from '../models/mentor.model';
import { ISocialLinkDocument, ISocialLink } from '../interfaces/socialLink.interface';
import ErrorResponse from '../utils/errorResponse';

export class SocialLinkService {
    // Create a new social link
    async createSocialLink(socialLinkData: ISocialLink): Promise<ISocialLinkDocument> {
        try {
            const mentor = await MentorModel.findById(socialLinkData.userId).exec();
            if (!mentor) throw new ErrorResponse('No Mentor found to associate social link', 404);

            const socialLink = await SocialLinkModel.create({
                behance: socialLinkData.behance,
                twitter: socialLinkData.twitter,
                instagram: socialLinkData.instagram,
                website: socialLinkData.website,
                userId: socialLinkData.userId,
            });

            mentor.socialLinks = socialLink._id;
            await mentor.save();

            return socialLink;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    // Get a social link by its user ID
    async getSocialLinkByUserId(userId: string): Promise<ISocialLinkDocument> {
        try {
            const socialLink = await SocialLinkModel.findOne({ userId }).exec();

            if (!socialLink) throw new ErrorResponse('No socialLink found', 404);

            return socialLink;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    // Update a social link by its user ID
    async updateSocialLinkByUserId(socialLinkData: ISocialLink): Promise<ISocialLinkDocument> {
        try {
            const socialLink = await SocialLinkModel.findOne({ userId: socialLinkData.userId }).exec();
            
            if (!socialLink) throw new ErrorResponse('No socialLink found', 404);
 
            for (const [key, value] of Object.entries(socialLinkData)) {
                if (value !== undefined) {
                    (socialLink as any)[key] = value;
                }
            }

            await socialLink.save();
            
            return socialLink;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }
}