import { Request, Response, NextFunction } from 'express';
import { SocialLinkService } from '../services/socialLink.service';
import ErrorResponse from '../utils/errorResponse';
import { socialLinkValidation } from '../validations/socialLink.validation';

const socialLinkService = new SocialLinkService();

// Create a new social link
export async function createSocialLink(req: Request, res: Response, next: NextFunction) {
    try {
        const { behance, twitter, instagram, website, userId } = req.body;

        const socialLinkData = socialLinkValidation.parse({ behance, twitter, instagram, website, userId });

        const socialLink = await socialLinkService.createSocialLink(socialLinkData);

        res.status(201).json({
            success: true,
            data: {
                behance: socialLink.behance,
                twitter: socialLink.twitter,
                instagram: socialLink.instagram,
                website: socialLink.website
            }
        });
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
}

// Get a social link by its user ID
export async function getSocialLinkByUserId(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params;

        const socialLink = await socialLinkService.getSocialLinkByUserId(userId);

        res.status(200).json({
            success: true,
            data: {
                behance: socialLink.behance,
                twitter: socialLink.twitter,
                instagram: socialLink.instagram,
                website: socialLink.website
            }
        });
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
}

// Update a social link by its user ID
export async function updateSocialLinkByUserId(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params;
    
        const { behance, twitter, instagram, website } = req.body;

        const socialLinkData = socialLinkValidation.parse({ behance, twitter, instagram, website, userId });
        
        const socialLink = await socialLinkService.updateSocialLinkByUserId(socialLinkData);

        res.status(200).json({
            success: true,
            data: {
                behance: socialLink.behance,
                twitter: socialLink.twitter,
                instagram: socialLink.instagram,
                website: socialLink.website
            }
        });
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
}