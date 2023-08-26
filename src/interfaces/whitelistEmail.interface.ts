import { Document, Types } from 'mongoose';

export interface IWhitelistEmailDocument extends Document {
  _id: Types.ObjectId;
  email: string;
}

export interface IDeleteResult {
  acknowledged: boolean;
  deletedCount: number;
}