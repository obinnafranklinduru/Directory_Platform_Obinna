import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config();

import { AdminModel } from '../models/admin.model';
import { WhitelistEmailModel } from '../models/whitelistEmail.model';
import { SUPER_ADMIN } from './index';
import ErrorResponse from "../utils/errorResponse";

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000'

export const setupPassport = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
                clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || '',
                callbackURL: `${BASE_URL}/v1/auth/google/callback`,
                scope: ['email', 'profile']
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    if (!profile) return done(new ErrorResponse('No user profile found', 404));

                    const allowedAdmins = await WhitelistEmailModel.findOne({ email: profile._json.email }).exec();
                
                    if (!allowedAdmins) return done(new ErrorResponse('You are not authorized to access this route.', 401));

                    let user = await AdminModel.findOne({ googleId: profile.id });

                    if (user) {
                        done(null, user)
                    } else if (profile._json.email === SUPER_ADMIN) {
                        user = await AdminModel.create({
                            googleId: profile.id,
                            displayName: profile.displayName,
                            email: profile._json.email,
                            isConfirmed: profile._json.email_verified,
                            avatar: profile._json.picture || null,
                            isSuperAdmin: true
                        });

                        done(null, user);
                    } else {
                        user = await AdminModel.create({
                            googleId: profile.id,
                            displayName: profile.displayName,
                            email: profile._json.email,
                            isConfirmed: profile._json.email_verified,
                            avatar: profile._json.picture || null,
                        });

                        done(null, user);
                    }
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.serializeUser((user: any, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (userId, done) => {
        try {
            const user = await AdminModel.findById(userId);
            done(null, user);
        } catch (error) {
            console.error('Error in user deserialization:', error);
            done(error);
        }
    });
}