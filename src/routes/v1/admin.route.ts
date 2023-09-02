import { Router } from 'express';
import {
  getAllAdmins,
  getAllSuperAdmins,
  getAdminByEmail,
  getAdminByID,
  setSuperAdmin,
  updateAdmin,
  deleteAdmin,
} from '../../controllers/admin.controller';
import { isAuthenticated, authenticateSuperAdmin } from '../../middlewares/auth.middleware';

const router = Router();

router
  .route('/')
  .get(isAuthenticated, getAllAdmins)
  .delete(isAuthenticated, authenticateSuperAdmin, deleteAdmin);

router
  .route('/email/:email')
  .get(isAuthenticated, getAdminByEmail);

router
  .route('/set_super_admin')
  .put(isAuthenticated, authenticateSuperAdmin, setSuperAdmin);

router
  .route('/id/:id')
  .get(isAuthenticated, getAdminByID)
  .put(isAuthenticated, updateAdmin);

router
  .route('/super_admin')
  .get(isAuthenticated, getAllSuperAdmins);

export default router;


/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Endpoints for managing admin users
 */

/**
 * @swagger
 * /v1/admins:
 *   get:
 *     summary: Get all admins
 *     tags: [Admins]
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
 *                     $ref: '#/components/schemas/AdminData'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 *   delete:
 *     summary: Delete an admins (Super Admin only)
 *     tags: [Admins]
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
 *                email: fake@example.com
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
 *                 deletedCount:
 *                   type: integer
 *                   format: int32
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/admins/email/{email}:
 *   get:
 *     summary: Get admin by email
 *     tags: [Admins]
 *     security:
 *       - googleAuth: []
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminDetails'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/admins/set_super_admin:
 *   put:
 *     summary: Set admin as Super Admin (Super Admin only)
 *     tags: [Admins]
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
 *                email: fake@example.com
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
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/admins/id/{id}:
 *   get:
 *     summary: Get admin by ID
 *     tags: [Admins]
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
 *               $ref: '#/components/schemas/AdminDetails'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 *   put:
 *     summary: Update admin details
 *     tags: [Admins]
 *     security:
 *       - googleAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayName:
 *                 type: string
 *               avatar:
 *                 type: string
 *             example:
 *               displayName: fake name
 *               avatar: https://lh3.googleusercontent.com/a/AAcHTtecH_6ZOOWXTALQXiC
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminDetails'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/admins/super_admin:
 *   get:
 *     summary: Get all super admins
 *     tags: [Admins]
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
 *                     $ref: '#/components/schemas/AdminData'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */