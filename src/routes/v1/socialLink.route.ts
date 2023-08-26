import express from 'express';
import {
  createSocialLink,
  getSocialLinkByUserId,
  updateSocialLinkByUserId,
} from '../../controllers/socialLink.controller';

const router = express.Router();

router
  .route('/')
  .post(createSocialLink);

router
  .route('/')
  .get(getSocialLinkByUserId)
  .put(updateSocialLinkByUserId);

export default router;
