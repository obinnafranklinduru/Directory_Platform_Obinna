import { Request, Response, NextFunction } from 'express';
import { WhitelistEmailService } from '../services/whitelistEmail.service';
import { emailValidation } from '../validations/admin.validation';
import { emailCreationValidation } from '../validations/whitelistEmail.validation';
import ErrorResponse from '../utils/errorResponse';

const whitelistEmailService = new WhitelistEmailService();

export async function createWhitelistEmail(req: Request, res: Response, next: NextFunction) {
    try {
        const { email } = req.body;

        const whitelistEmailData = await emailCreationValidation.parseAsync({ email })

        const whitelistEmail = await whitelistEmailService.createWhitelistEmail(whitelistEmailData.email);

        res.status(201).json({
            success: true,
            data: {
                email: whitelistEmail.email
            }
        });
    } catch (error) {
        next(new ErrorResponse(error.message, 500))
    }
}

export async function getAllWhitelistEmails(req: Request, res: Response, next: NextFunction){
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;

        const whitelistEmails = await whitelistEmailService.getAllWhitelistEmails(page, limit);

        res.status(200).json({ success: true, data: whitelistEmails });
    } catch (error) {
        next(error)
    }
}

export async function getWhitelistEmail(req: Request, res: Response, next: NextFunction){
    try {
        const { id } = req.params;

        const whitelistEmail = await whitelistEmailService.getWhitelistEmail(id);

        res.status(200).json({
            success: true,
            data: {
                email: whitelistEmail.email
            }
        });
    } catch (error) {
        next(error);
    }
}

export async function updateWhitelistEmail(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { email } = req.body;

        const whitelistEmail = emailValidation.parse(email)

        const updatedWhitelistEmail = await whitelistEmailService.updateWhitelistEmail(id, whitelistEmail);

        res.status(200).json({
            success: true,
            data: {
                email: updatedWhitelistEmail.email
            }
        });
    } catch (error) {
        next(error)
    }
}

export async function deleteWhitelistEmail(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const result = await whitelistEmailService.deleteWhitelistEmail(id);

        res.status(200).json({
            success: result.acknowledged,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        next(error)
    }
}