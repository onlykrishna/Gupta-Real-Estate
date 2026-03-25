import { Router } from 'express';
import { loginAdmin, logoutAdmin } from '../controllers/adminAuthController';

const router = Router();

// POST /api/admin/login
router.post('/login', loginAdmin);

// POST /api/admin/logout
router.post('/logout', logoutAdmin);

export default router;
