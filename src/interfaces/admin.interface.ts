import { Document, Types } from 'mongoose';

export interface IEmail {
  email: string;
}

export interface IAdminDocument extends IEmail, Document {
  _id: Types.ObjectId;
  displayName: string;
  avatar?: string;
  isSuperAdmin: boolean;
  googleId?: string;
}

export interface IAdminUpdate {
  displayName?: string;
  avatar?: string;
}