import { Request, Response, NextFunction } from 'express';
import { uploadFile, deleteFile } from '../services/file.service';

// Controller for handling file upload
export async function uploadFileController(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        const { buffer, mimetype } = req.file;

        const result = await uploadFile(buffer, mimetype);

        return res.status(201).json({
            success: true,
            data: {
                publicId: result.public_id,
                url: result.url,
                mimetype: result.mimeType
            }
        });
    } catch (error) {
        return next(error);
    }
}

// Controller for handling file deletion
export async function deleteFileController(req: Request, res: Response, next: NextFunction) {
    try {
        const { publicId } = req.params;
        await deleteFile(publicId);
        
        return res.status(200).send({ success: true, message: 'Image deleted successfully' });
    } catch (error) {
        return next(error);
    }
}