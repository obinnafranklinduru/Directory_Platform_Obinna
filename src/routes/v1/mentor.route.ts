import express from 'express';
import {
  createMentor,
  addMentorCategoryById,
  removeMentorCategoryById,
  addMentorAvatar,
  getAllMentors,
  getMentorById,
  getMentorByCategoryOrName,
  updateMentor,
  deleteMentorController,
} from '../../controllers/mentor.controller';
import { isAuthenticated, authenticateSuperAdmin } from '../../middlewares/auth.middleware';

const router = express.Router();

router
  .route('/')
  .post(isAuthenticated, createMentor)
  .get(getAllMentors);

router
  .route('/:mentorId/categories')
  .put(isAuthenticated, addMentorCategoryById)
  .delete(isAuthenticated, removeMentorCategoryById);

router
  .route('/:mentorId/avatar')
  .put(isAuthenticated, addMentorAvatar);

router
  .route('/search')
  .get(getMentorByCategoryOrName);

router
  .route('/:mentorId')
  .get(getMentorById)
  .put(isAuthenticated, updateMentor)
  .delete(isAuthenticated, authenticateSuperAdmin, deleteMentorController);

export default router;

/**
 * @swagger
 * tags:
 *   name: Mentors
 *   description: Endpoints for managing mentors
 */

/**
 * @swagger
 * /v1/mentors:
 *   post:
 *     summary: Create a new mentor
 *     tags: [Mentors]
 *     security:
 *       - googleAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MentorData'
 *     responses:
 *       201:
 *         description: Successful mentor creation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/MentorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'

 *   get:
 *     summary: Get all mentors
 *     tags: [Mentors]
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
 *                     $ref: '#/components/schemas/MentorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/mentors/{mentorId}/categories:
 *   put:
 *     summary: Add categories to a mentor
 *     tags: [Mentors]
 *     security:
 *       - googleAuth: []
 *     parameters:
 *       - name: mentorId
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
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               categories: ["64f0a24bb93b566c726ce906", "c64f0a24bb93b566c726ce92"]
 *     responses:
 *       200:
 *         description: Successful category addition
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/MentorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   delete:
 *     summary: Remove categories from a mentor
 *     tags: [Mentors]
 *     security:
 *       - googleAuth: []
 *     parameters:
 *       - name: mentorId
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
 *               categoryId:
 *                 type: string
 *             example:
 *               categoryId: "64f0a24bb93b566c726ce906"
 *     responses:
 *       200:
 *         description: Successful category removal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/MentorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/mentors/{mentorId}/avatar:
 *   put:
 *     summary: Add an avatar to a mentor
 *     tags: [Mentors]
 *     security:
 *       - googleAuth: []
 *     parameters:
 *       - name: mentorId
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
 *               url:
 *                 type: string
 *             example:
 *               url: "https://example.com/avatar.jpg"
 *     responses:
 *       200:
 *         description: Successful avatar addition
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/MentorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/mentors/search:
 *   get:
 *     summary: Get mentors by name or category
 *     tags: [Mentors]
 *     security:
 *       - googleAuth: []
 *     parameters:
 *       - name: firstName
 *         in: query
 *         schema:
 *           type: string
 *       - name: lastName
 *         in: query
 *         schema:
 *           type: string
 *       - name: categories
 *         in: query
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
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MentorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/mentors/{mentorId}:
 *   get:
 *     summary: Get a mentor by ID
 *     tags: [Mentors]
 *     security:
 *       - googleAuth: []
 *     parameters:
 *       - name: mentorId
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
 *                   $ref: '#/components/schemas/MentorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   put:
 *     summary: Update a mentor by ID
 *     tags: [Mentors]
 *     security:
 *       - googleAuth: []
 *     parameters:
 *       - name: mentorId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MentorData'
 *     responses:
 *       200:
 *         description: Successful mentor update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/MentorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   delete:
 *     summary: Delete a mentor by ID (Super Admin only)
 *     tags: [Mentors]
 *     security:
 *       - googleAuth: []
 *     parameters:
 *       - name: mentorId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful mentor deletion
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */