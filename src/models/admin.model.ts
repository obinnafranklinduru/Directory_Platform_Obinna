import { Schema, model } from 'mongoose';
import { IAdminDocument } from '../interfaces/admin.interface';

const adminSchema = new Schema({
  displayName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },
  avatar: {
    type: String,
    trim: true
  },
  isSuperAdmin: {
    type: Boolean,
    default: false
  },
  googleId: {
    type: String,
    trim: true
  },
});

export const AdminModel = model<IAdminDocument>('Admin', adminSchema);