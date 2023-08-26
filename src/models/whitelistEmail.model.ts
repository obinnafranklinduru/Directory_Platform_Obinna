import { Schema, model } from 'mongoose';
import { IWhitelistEmailDocument } from '../interfaces/whitelistEmail.interface';

const whitelistEmailSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    unique: true
  }
});

export const WhitelistEmailModel = model<IWhitelistEmailDocument>('WhitelistEmail', whitelistEmailSchema);