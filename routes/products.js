import { Router } from 'express';
const router = Router();
import multer, { diskStorage } from 'multer';
import { extname } from 'path';
import productController from '../controllers/productController.js';
const { listProducts, createProduct, getProductById } = productController;
import auth from '../middleware/auth.js';

// multer config
const storage = diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + extname(file.originalname))
});
const upload = multer({ storage });

router.get('/', listProducts); // GET /api/products?page=1&limit=10
router.get('/:id', getProductById); // Or your controller logic here
router.post('/', auth, upload.single('image'), createProduct); // admin use (assumes auth)

export default router;
