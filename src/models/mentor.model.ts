import { Schema, model, Types } from 'mongoose';
import { IMentorDocument } from '../interfaces/mentor.interface';

const mentorSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    avatar: {
        type: String,
        default: null,
    },
    socialLinks: {
        type: Types.ObjectId,
        ref: 'SocialLink'
    },
    categories: [{ type: Types.ObjectId, ref: 'Category', autopopulate: true }],
})
    
mentorSchema.plugin(require('mongoose-autopopulate'));

export const MentorModel = model<IMentorDocument>('Mentor', mentorSchema);