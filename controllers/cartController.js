import db from '../models/index.js';
const { CartItem, Product } = db;

/**
 * POST /api/cart/add
 * body: { productId, quantity }
 */
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // auth middleware sets req.user

    // find existing item
    let cartItem = await CartItem.findOne({
      where: { user_id: userId, product_id: productId }
    });

    if (cartItem) {
      // update quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // create new
      cartItem = await CartItem.create({
        user_id: userId,
        product_id: productId,
        quantity
      });
    }

    res.json({ message: 'Added to cart', item: cartItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * GET /api/cart
 */
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await CartItem.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Product,
          as: 'Product', // must match the alias you used in associations
          attributes: ['id', 'name', 'price', 'imageUrl'] // limit fields if you like
        }
      ]
    });

    res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * PUT /api/cart/item/:id
 * body: { quantity }
 */
export const updateItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const userId = req.user.id;

    const item = await CartItem.findOne({
      where: { id: req.params.id, user_id: userId }
    });

    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.quantity = quantity;
    await item.save();

    res.json({ message: 'Updated', item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * DELETE /api/cart/item/:id
 */
export const removeItem = async (req, res) => {
  try {
    const userId = req.user.id;

    const item = await CartItem.findOne({
      where: { id: req.params.id, user_id: userId }
    });

    if (!item) return res.status(404).json({ message: 'Item not found' });

    await item.destroy();

    res.json({ message: 'Removed from cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
