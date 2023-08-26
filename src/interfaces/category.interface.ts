import { Document, Types } from 'mongoose';

export interface ICategoryDocument extends Document {
    _id: Types.ObjectId;
    name: string;
}