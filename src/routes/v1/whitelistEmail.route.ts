import express from 'express';
import {
    createWhitelistEmail,
    getAllWhitelistEmails,
    getWhitelistEmail,
    updateWhitelistEmail,
    deleteWhitelistEmail,
} from '../../controllers/whitelistEmail.controller';
import { isAuthenticated, authenticateSuperAdmin } from '../../middlewares/auth.middleware';

const router = express.Router();
 
router
    .route('/')
    .post(isAuthenticated, authenticateSuperAdmin, createWhitelistEmail)
    .get(isAuthenticated, authenticateSuperAdmin, getAllWhitelistEmails);

router
    .route('/:id')
    .get(isAuthenticated, authenticateSuperAdmin, getWhitelistEmail)
    .put(isAuthenticated, authenticateSuperAdmin, updateWhitelistEmail)
    .delete(isAuthenticated, authenticateSuperAdmin, deleteWhitelistEmail);

export default router;

/**
 * @swagger
 * tags:
 *   name: WhitelistEmails
 *   description: Endpoints for managing whitelist email addresses
 */

/**
 * @swagger
 * /v1/whitelist_email:
 *   post:
 *     summary: Create a new whitelist email address (Super Admin only)
 *     tags: [WhitelistEmails]
 *     security:
 *       - googleAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *             example:
 *               email: fake@example.com
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/WhitelistEmail'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/whitelist_email:
 *   get:
 *     summary: Get all whitelist email addresses (Super Admin only)
 *     tags: [WhitelistEmails]
 *     security:
 *       - googleAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/WhitelistEmailData'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/whitelist_email/{id}:
 *   get:
 *     summary: Get a whitelist email by ID (Super Admin only)
 *     tags: [WhitelistEmails]
 *     security:
 *       - googleAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/WhitelistEmail'
 *       404:
 *         description: Whitelist email not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/whitelist_email/{id}:
 *   put:
 *     summary: Update a whitelist email by ID (Super Admin only)
 *     tags: [WhitelistEmails]
 *     security:
 *       - googleAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *             example:
 *               email: fake@example.com
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/WhitelistEmail'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Whitelist email not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/whitelist_email/{id}:
 *   delete:
 *     summary: Delete a whitelist email by ID (Super Admin only)
 *     tags: [WhitelistEmails]
 *     security:
 *       - googleAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IDeleteResult'
 *       404:
 *         description: Whitelist email not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */