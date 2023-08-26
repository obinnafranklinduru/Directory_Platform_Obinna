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