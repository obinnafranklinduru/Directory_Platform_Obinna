import express, { Router } from 'express';
import passport from "passport";

import { googleCallback, success, logout } from '../../controllers/auth.controller';
import { isAuthenticated } from '../../middlewares/auth.middleware';

const router: Router = express.Router();

router.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/v1/auth/login', failureMessage: true }),
    googleCallback,
);

router.get('/success', isAuthenticated, success);

router.get('/logout', isAuthenticated, logout);

export default router;

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints related to user authentication
 */


/**
 * @swagger
 * /v1/auth/login:
 *   get:
 *     tags: [Authentication]
 *     summary: Redirects to Google login for OAuth 2.0 authentication
 *     description: Redirects the user to Google's login page for OAuth 2.0 authentication.
 */

/**
 * @swagger
 * /v1/auth/google/callback:
 *   get:
 *     tags: [Authentication]
 *     summary: Google OAuth 2.0 callback
 *     description: Handles the callback after successful Google OAuth 2.0 authentication.
 *                  If successful redirects to success route else to google login
 */

/**
 * @swagger
 * /v1/auth/success:
 *     get:
 *       summary: Get user details after successful authentication
 *       description: Retrieves the user details (id, name, email, avatar, isSuperAdmin) 
 *                    after successful authentication.
 *       tags: [Authentication]
 *       security:
 *         - googleAuth: []
 *       responses:
 *         200:
 *           description: The user details were successfully retrieved.
 *           content:
 *             application/json:
 *               schema:
 *                  $ref: '#/components/schemas/AdminData'
 *         400:
 *           description: Bad request. No user data passed into the request body.
 *           content:
 *             application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/auth/logout:
 *   get:
 *     tags: [Authentication]
 *     security:
 *        - googleAuth: []
 *     summary: Logout and terminate the session
 *     description: Logs out the user and terminates the session.
 */