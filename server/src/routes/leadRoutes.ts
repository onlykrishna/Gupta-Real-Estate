import { Router } from 'express';
import { createLead, getLeads, updateLeadStatus, exportLeadsCsv } from '../controllers/leadController';
import { protectAdmin } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateResource';
import { createLeadSchema, updateLeadStatusSchema } from '../schemas/lead.schema';

const router = Router();

// Public Property Inquiry Mechanism
router.post('/', validate(createLeadSchema), createLead);

// Admin-locked Lead Administration
// Ensure /export sits highest in hierarchy above the /:id parameters 
router.get('/export', protectAdmin, exportLeadsCsv);
router.get('/', protectAdmin, getLeads);
router.patch('/:id', protectAdmin, validate(updateLeadStatusSchema), updateLeadStatus);

export default router;
