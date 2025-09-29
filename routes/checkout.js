import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth.js';
import { checkout } from '../controllers/checkoutController.js';

router.post('/', auth, checkout);

export default router;
