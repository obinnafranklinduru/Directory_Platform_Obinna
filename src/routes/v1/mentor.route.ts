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