import { object, string } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = object({
  NODE_ENV: string().refine((val: string) => ['production', 'development', 'test'].includes(val), {
    message: 'NODE_ENV must be one of "production", "development", or "test"',
  }),
  PORT: string().refine((val: any) => Number(val)),
  MONGODB_URL: string().url().nonempty(),
  CLOUD_NAME: string().nonempty(),
  CLOUDINARY_API_KEY: string().nonempty(),
  CLOUDINARY_API_SECRET: string().nonempty(),
  SUPER_ADMIN: string().nonempty(),
});

const envVars = process.env;

export const ENV = envVarsSchema.parse(envVars).NODE_ENV;
export const PORT = envVarsSchema.parse(envVars).PORT;
export const MONGODB_URL = envVarsSchema.parse(envVars).MONGODB_URL;
export const CLOUD_NAME = envVarsSchema.parse(envVars).CLOUD_NAME
export const CLOUDINARY_API_KEY = envVarsSchema.parse(envVars).CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = envVarsSchema.parse(envVars).CLOUDINARY_API_SECRET
export const SUPER_ADMIN = envVarsSchema.parse(envVars).SUPER_ADMIN