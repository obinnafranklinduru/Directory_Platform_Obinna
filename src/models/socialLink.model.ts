import { Schema, model, Types } from 'mongoose';
import { ISocialLinkDocument } from '../interfaces/socialLink.interface';

const socialLinkSchema = new Schema({
    behance: { type: String, trim: true },
    twitter: { type: String, trim: true },
    instagram: { type: String, trim: true },
    website: { type: String, trim: true },
    userId: { type: Types.ObjectId, ref: 'User', required: true }
});

export const SocialLinkModel = model<ISocialLinkDocument>('SocialLink', socialLinkSchema);