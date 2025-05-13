import express from 'express';
import {
    cekProfile,
    editProfile,
    regUser
} from '../controllers/UsersController.js';
import { verifyUser } from '../middleware/Auth.js';

const router = express.Router();

router.post('/register', regUser);
router.get('/profile/:id', cekProfile);
router.patch('/edit-profile', verifyUser, editProfile);

export default router;