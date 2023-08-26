import express from 'express';
import { multerUpload } from '../../services/file.service';
import { uploadFileController, deleteFileController } from '../../controllers/file.controller';
import { isAuthenticated, authenticateSuperAdmin } from '../../middlewares/auth.middleware';

const router = express.Router();

router
    .route('/')
    .post(isAuthenticated, authenticateSuperAdmin, multerUpload.single('file'), uploadFileController);

router
    .route('/delete/:publicId')
    .delete(isAuthenticated, authenticateSuperAdmin, deleteFileController);

export default router;


/**
 * @swagger
 * tags:
 *   name: Files
 *   description: Endpoints for handling file upload and deletion
 */

/**
 * @swagger
 * /v1/uploads:
 *   post:
 *     summary: Upload a file
 *     tags: [Files]
 *     security:
 *       - googleAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     publicId:
 *                       type: string
 *                     url:
 *                       type: string
 *                     mimetype:
 *                       type: string
 *       400:
 *         description: Bad request or no file uploaded.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/uploads/delete/{publicId}:
 *   delete:
 *     summary: Delete a file by public ID
 *     tags: [Files]
 *     security:
 *       - googleAuth: []
 *     parameters:
 *       - name: publicId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: File deleted successfully
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
