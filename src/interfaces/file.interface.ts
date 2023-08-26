import { Types } from 'mongoose';

export interface IFileDocument {
    _id?: Types.ObjectId;
    public_id: string;
    url: string;
    mimeType?: string
}