import { Schema, model } from 'mongoose';
import { IFileDocument } from '../interfaces/file.interface';

const fileSchema = new Schema({
    public_id: { 
        type: String, 
        required: true 
    },
    url: { 
        type: String, 
        required: true
    },
    mimeType: { 
        type: String, 
        required: true 
    },
});

export const FileModel = model<IFileDocument>('File', fileSchema);