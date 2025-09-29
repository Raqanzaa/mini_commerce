import db from '../models/index.js';
const { CartItem, Product, Transaction, TransactionItem, sequelize } = db;

// Add 'export' to make this a named export
export const checkout = async (req, res) => {
  const t = await sequelize.transaction(); // Start a transaction

  try {
    const userId = req.user.id;

    // 1. Get all cart items for the user, including product details
    const cartItems = await CartItem.findAll({
      where: { user_id: userId },
      include: [{ model: Product }],
      transaction: t
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty.' });
    }

    // 2. Check stock for every item and calculate total price
    let total = 0;
    for (const item of cartItems) {
      if (item.Product.stock < item.quantity) {
        // If not enough stock, roll back the transaction
        await t.rollback();
        return res.status(400).json({ message: `Not enough stock for ${item.Product.name}.` });
      }
      total += item.Product.price * item.quantity;
    }

    // 3. Create a single transaction record
    const transaction = await Transaction.create({
      user_id: userId,
      total: total
    }, { transaction: t });

    // 4. Create transaction items and update stock for each product
    for (const item of cartItems) {
      await TransactionItem.create({
        transaction_id: transaction.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.Product.price, // Lock the price at time of purchase
        subtotal: item.Product.price * item.quantity
      }, { transaction: t });

      // Decrement the stock
      await Product.update(
        { stock: item.Product.stock - item.quantity },
        { where: { id: item.product_id }, transaction: t }
      );
    }

    // 5. Clear the user's cart
    await CartItem.destroy({
      where: { user_id: userId },
      transaction: t
    });

    // 6. If everything is successful, commit the transaction
    await t.commit();

    res.json({ message: 'Checkout successful!', transactionId: transaction.id });

  } catch (err) {
    // 7. If any error occurs, roll back all changes
    await t.rollback();
    console.error('Checkout error:', err);
    res.status(500).json({ message: 'An error occurred during checkout.' });
  }
};
