import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Import the functions that define the models
import defineUserModel from './user.js';
import defineProductModel from './product.js';
import defineCartItemModel from './cart_item.js';
import defineTransactionModel from './transaction.js';
import defineTransactionItemModel from './transaction_item.js';

// Define the models by calling the imported functions
const User = defineUserModel(sequelize, DataTypes);
const Product = defineProductModel(sequelize, DataTypes);
const CartItem = defineCartItemModel(sequelize, DataTypes);
const Transaction = defineTransactionModel(sequelize, DataTypes);
const TransactionItem = defineTransactionItemModel(sequelize, DataTypes);

// Associations
User.hasMany(CartItem, { foreignKey: 'user_id' });
CartItem.belongsTo(User, { foreignKey: 'user_id' });
Product.hasMany(CartItem, { foreignKey: 'product_id' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });

User.hasMany(Transaction, { foreignKey: 'user_id' });
Transaction.belongsTo(User, { foreignKey: 'user_id' });
Transaction.hasMany(TransactionItem, { foreignKey: 'transaction_id' });
TransactionItem.belongsTo(Transaction, { foreignKey: 'transaction_id' });
Product.hasMany(TransactionItem, { foreignKey: 'product_id' });
TransactionItem.belongsTo(Product, { foreignKey: 'product_id' });

// Export the db object
const db = {
  sequelize,
  User,
  Product,
  CartItem,
  Transaction,
  TransactionItem,
};

export default db;