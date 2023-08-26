import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../services/admin.service';
import { 
    emailValidation,
    updateAdminValidation,
} from '../validations/admin.validation';
import { IAdminDocument } from '../interfaces/admin.interface';


const adminService = new AdminService();

export async function getAllAdmins(req: Request, res: Response, next: NextFunction) {
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;

        const admins = await adminService.getAllAdmins(page, limit);

        res.status(200).json({ success: true, data: admins });
    } catch (error) {
        next(error);
    }
}

export async function getAllSuperAdmins(req: Request, res: Response, next: NextFunction) {
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;

        const admins = await adminService.getSuperAdmins(page, limit);

        res.status(200).json({ success: true, data: admins });
    } catch (error) {
        next(error);
    }
}

export async function getAdminByEmail(req: Request, res: Response, next: NextFunction) {
    try {
        const { email } = req.params;

        const adminData = emailValidation.parse(email);

        const admin = await adminService.getAdminByEmail(adminData);

        res.status(200).json({
            success: true,
            data: {
                id: admin._id,
                name: admin.displayName,
                email: admin.email,
                avatar: admin.avatar,
                isSuperAdmin: admin.isSuperAdmin
            }
        });
    } catch (error) {
        next(error);
    }
}

export async function getAdminByID(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.params.id;

        const Id = userId.toString();

        const admin = await adminService.getAdminById(Id);

        res.status(200).json({
            success: true,
            data: {
                id: admin._id,
                name: admin.displayName,
                email: admin.email,
                avatar: admin.avatar,
                isSuperAdmin: admin.isSuperAdmin
            }
        });
    } catch (error) {
        next(error);
    }
}

export async function setSuperAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const { email } = req.body;
        
        const adminData = emailValidation.parse(email);
        
        const result = await adminService.setSuperAdmin(adminData);

        res.status(200).json({ success: true, message: result });
    } catch (error) {
        next(error);
    }
}

export async function updateAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.user as IAdminDocument;

        const Id = user._id.toString();

        const { displayName, avatar } = req.body;
        
        const adminData = updateAdminValidation.parse({ displayName, avatar });
        
        const admin = await adminService.updateAdmin(Id, adminData);

        res.status(200).json({
            success: true,
            data: {
                id: admin._id,
                name: admin.displayName,
                email: admin.email,
                avatar: admin.avatar,
                isSuperAdmin: admin.isSuperAdmin
            }
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const { email } = req.body;

        const adminData = emailValidation.parse(email);

        const result = await adminService.deleteAdmin(adminData);
        
        res.status(200).json({
            success: result.acknowledged,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        next(error);
    }
}
