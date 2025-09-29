// cart_item.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('cart_items', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    }
  }, {
    timestamps: true,
    underscored: true,
    indexes: [{
      unique: true,
      fields: ['user_id', 'product_id']
    }]
  });
};
