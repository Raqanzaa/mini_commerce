import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth.js';
import { addToCart, getCart, updateItem, removeItem } from '../controllers/cartController.js';

router.post('/add', auth, addToCart);
router.get('/', auth, getCart);
router.put('/item/:id', auth, updateItem); // change quantity
router.delete('/item/:id', auth, removeItem);

export default router;
