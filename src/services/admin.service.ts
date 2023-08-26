import { AdminModel } from '../models/admin.model';
import { WhitelistEmailModel } from '../models/whitelistEmail.model';
import ErrorResponse from '../utils/errorResponse';
import {
    IAdminDocument,
    IAdminUpdate
} from '../interfaces/admin.interface';
import { IDeleteResult } from '../interfaces/whitelistEmail.interface';

export class AdminService {
    async getAllAdmins(page: number = 1, limit: number = 10): Promise<IAdminDocument[]> {
        try {
            const skip = (page - 1) * limit;

            const admins = await AdminModel.find({}, '-__v')
                .sort({ name: 1 })
                .skip(skip)
                .limit(limit)
                .exec();

            if (admins.length === 0) throw new ErrorResponse('Admins is not found', 404);

            return admins;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    async getSuperAdmins(page: number = 1, limit: number = 10): Promise<IAdminDocument[]> {
        try {
            const skip = (page - 1) * limit;

            const admins = await AdminModel.find({ isSuperAdmin: true }, '-__v')
                .sort({ name: 1 })
                .skip(skip)
                .limit(limit)
                .exec();

            if (admins.length === 0) throw new ErrorResponse('SuperAdmin is not found', 404);

            return admins;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    async getAdminByEmail(email: string): Promise<IAdminDocument> {
        try {
            const admin = await AdminModel.findOne({ email }).exec();

            if (!admin) throw new ErrorResponse('Admin is not found', 404);

            return admin;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    async getAdminById(adminId: string): Promise<IAdminDocument> {
        try {
            const admin = await AdminModel.findById(adminId).exec();

            if (!admin) throw new ErrorResponse('Admin is not found', 404);

            return admin;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    async setSuperAdmin(email: string): Promise<string> {
        try {
            const admin = await AdminModel.findOne({ email }).exec();

            if (!admin) throw new ErrorResponse('Admin not found', 404);
            if (admin.isSuperAdmin) throw new ErrorResponse('Email is SuperAdmin', 400);
            
            admin.isSuperAdmin = true

            admin.save();

            return `Sucessfully set ${email} to be SuperAdmin`;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    async updateAdmin(adminId: string, adminData: IAdminUpdate): Promise<IAdminDocument> {
        try {
            const admin = await AdminModel.findById(adminId).exec();

            if (!admin) throw new ErrorResponse('Admin not found', 404);

            if (adminData.displayName) {
                admin.displayName = adminData.displayName;
            }

            if (adminData.avatar) {
                admin.avatar = adminData.avatar;
            }

            await admin.save();

            return admin;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }

    async deleteAdmin(email: string): Promise<IDeleteResult> {
        try {
            const admin = await AdminModel.findOne({ email });
            const whitelistedEmail = await WhitelistEmailModel.findOne({ email });

            if (!admin) throw new ErrorResponse('Admin not found', 404);

            if (admin.isSuperAdmin) {
                const admins = await this.getSuperAdmins();

                if (admins.length === 1) throw new ErrorResponse('Set an email SuperAdmin', 400);
            }
            
            const deleteResult = await AdminModel.deleteOne({ email }).exec();
            
            if (whitelistedEmail) {
                await WhitelistEmailModel.deleteOne({ email }).exec();

                deleteResult.deletedCount += 1;
            }

            return deleteResult;
        } catch (error) {
            throw new ErrorResponse(error.message, 400);
        }
    }
}