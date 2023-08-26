import { WhitelistEmailModel } from '../models/whitelistEmail.model';
import { IWhitelistEmailDocument, IDeleteResult } from '../interfaces/whitelistEmail.interface';
import ErrorResponse from '../utils/errorResponse';
 
export class WhitelistEmailService {
    async createWhitelistEmail(email: string): Promise<IWhitelistEmailDocument> {
        try {
            const whitelistEmail = await WhitelistEmailModel.create({ email });

            return whitelistEmail;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    async getAllWhitelistEmails(page: number = 1, limit: number = 10): Promise<IWhitelistEmailDocument[]> {
        try {
            const skip = (page - 1) * limit;

            const whitelistEmails = await WhitelistEmailModel.find({}, '-__v')
                .sort({ email: 1 })
                .skip(skip)
                .limit(limit)
                .exec();
            
            if (whitelistEmails.length === 0) throw new ErrorResponse('No whitelisted email found', 404);

            return whitelistEmails;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    async getWhitelistEmail(id: string): Promise<IWhitelistEmailDocument> {
        try {

            const whitelistEmail = await WhitelistEmailModel.findOne({ _id: id }, '-__v').exec();
            
            if (!whitelistEmail) throw new ErrorResponse('No whitelisted email found', 404);

            return whitelistEmail;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    async updateWhitelistEmail(id: string, email: string): Promise<IWhitelistEmailDocument> {
        try {
            const whitelistEmail = await WhitelistEmailModel.findById(id);

            if (!whitelistEmail) throw new ErrorResponse('Whitelisted email not found for updating', 404);
            
            whitelistEmail.email = email;
            await whitelistEmail.save();

            return whitelistEmail;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    async deleteWhitelistEmail(id: string): Promise<IDeleteResult> {
        try {
            const whitelistEmail = await WhitelistEmailModel.findById(id);

            if (!whitelistEmail) throw new ErrorResponse('Whitelisted email not found for deletion', 404);

            const deleteResult = await WhitelistEmailModel.deleteOne({ _id: id }).exec();

            return deleteResult;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }
}