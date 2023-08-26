import { Document, Types } from 'mongoose';

export interface ISocialLink {
    behance?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
    userId: string;
}

export interface ISocialLinkDocument extends ISocialLink, Document {
    _id: Types.ObjectId;
}