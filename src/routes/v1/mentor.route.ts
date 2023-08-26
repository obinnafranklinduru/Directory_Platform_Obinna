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
import { isAuthenticated } from '../../middlewares/auth.middleware';

const router = express.Router();

router
  .route('/')
  .post(isAuthenticated, createMentor)
  .get(getAllMentors);

router
  .route('/:mentorId/categories')
  .put(addMentorCategoryById)
  .delete(removeMentorCategoryById);

router
  .route('/:mentorId/avatar')
  .put(addMentorAvatar);

router
  .route('/search')
  .get(getMentorByCategoryOrName);

router
  .route('/:mentorId')
  .get(getMentorById)
  .put(updateMentor)
  .delete(deleteMentorController);

export default router;