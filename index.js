// Use the side-effect import for dotenv in ES Modules
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

// Import all your route modules
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import checkoutRoutes from './routes/checkout.js';

// Import the database object and get sequelize from it
import db from './models/index.js';
const { sequelize } = db;
const corsOptions = {
  // Your React app's origin
  origin: 'http://localhost:3000', 
  // Methods to allow
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // Headers to allow
  allowedHeaders: 'Content-Type,Authorization',
};

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images from the 'uploads' directory
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Use the imported routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

const PORT = process.env.PORT || 4000;

// Connect to the database and start the server
sequelize.authenticate()
  .then(() => {
    console.log('✅ DB connected successfully.');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
  });
