import db from '../models/index.js';
const { Product } = db;

const listProducts = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1'), 1);
    const limit = Math.min(parseInt(req.query.limit || '10'), 100);
    const offset = (page - 1) * limit;
    const { count, rows } = await Product.findAndCountAll({ limit, offset, order: [['createdAt','DESC']] });
    res.json({ meta: { total: count, page, limit, pages: Math.ceil(count/limit) }, data: rows });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

const createProduct = async (req, res) => {
  try {
    // simple admin guard (improve in prod)
    if(req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const { name, price, stock, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const p = await Product.create({ name, price, stock, description, image });
    res.json(p);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id); // Example using Sequelize

    if (!product) {
      // If the database returns null, send a 404
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export default { listProducts, createProduct, getProductById };
