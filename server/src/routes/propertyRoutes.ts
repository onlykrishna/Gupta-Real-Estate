import { Router } from 'express';
import { createProperty, getProperties, getPropertyById, updateProperty, deleteProperty } from '../controllers/propertyController';
import { protectAdmin } from '../middleware/authMiddleware';
import { upload } from '../middleware/uploadMiddleware';
import { validate } from '../middleware/validateResource';
import { createPropertySchema, updatePropertySchema } from '../schemas/property.schema';

const router = Router();

// Public Property APIs
router.get('/', getProperties);
router.get('/:id', getPropertyById);

// Admin / Protected Property APIs
// Maximum 10 images uploaded at once via multer limit array middleware
router.post('/', protectAdmin, upload.array('images', 10), validate(createPropertySchema), createProperty);
router.put('/:id', protectAdmin, upload.array('images', 10), validate(updatePropertySchema), updateProperty);
router.delete('/:id', protectAdmin, deleteProperty);

export default router;
