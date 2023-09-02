import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import multer from 'multer';
import { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../config';  
import { IFileDocument } from '../interfaces/file.interface';
import { FileModel } from '../models/file.model';

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

const multerUpload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

        if (allowedMimeTypes.includes(file.mimetype)) {
            callback(null, true); 
        } else {
            callback(new Error('Invalid file type'));
        }
    }
});

const uploadFile = async (filePath: Buffer, mimeType: string): Promise<IFileDocument> => {
    try {
        const uploadStreamPromise = new Promise<IFileDocument>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'auto', use_filename: true },
                async (error, result: IFileDocument | undefined) => {
                    if (error) {
                        reject(new Error('An error occurred while uploading the file to Cloudinary'));
                        return;
                    }

                    if (!result) {
                        reject(new Error('No upload result received from Cloudinary'));
                        return;
                    }

                    resolve(result);
                }
            );

            const readableStream = streamifier.createReadStream(filePath);

            readableStream.on('data', (chunk) => {
                if (!uploadStream.write(chunk)) {
                    readableStream.pause();
                }
            });

            uploadStream.on('drain', () => {
                readableStream.resume();
            });

            uploadStream.on('finish', () => {
                console.log('Upload finished successfully');
            });

            // Pipe the readable stream to the upload stream
            readableStream.pipe(uploadStream);
        });

        const result = await uploadStreamPromise;

        const fileData: IFileDocument = {
            public_id: result.public_id,
            url: result.url,
            mimeType
        }

        await FileModel.create({
            public_id: fileData.public_id,
            url: fileData.url,
            mimeType: fileData.mimeType
        });

        return fileData;

    } catch (error) {
        throw new Error('An error occurred while uploading the file to Cloudinary');
    }
}

const deleteFile = async (public_id: string) => {
    try {
        // Delete from Cloudinary
        const cloudinaryFileResult = await cloudinary.uploader.destroy(public_id);

        // Delete from Database
        const fileModelFileResult = await FileModel.deleteOne({ public_id });

        return { message: cloudinaryFileResult.result, deletedCount: fileModelFileResult.deletedCount };

    } catch (error) {
        throw new Error('An error occurred while deleting the file');
    }
}

export { multerUpload, uploadFile, deleteFile };