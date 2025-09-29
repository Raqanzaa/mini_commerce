import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('transaction_items', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    }
  }, {
    // Timestamps should be true to match the created_at in your schema
    timestamps: true,
    updatedAt: false, // You only have created_at in the SQL for this table
    underscored: true
  });
};
