import { Document, Types } from 'mongoose';

export interface IMentorData {
    firstName?: string;
    lastName?: string;
    email?: string;
    avatar?: string;
}

export interface IMentorDocument extends IMentorData, Document {
    _id: Types.ObjectId;
    socialLinks: Types.ObjectId;
    categories: string[];
    googleId?: string;
}