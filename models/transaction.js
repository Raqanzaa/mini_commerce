import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('transactions', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    }
  }, {
    timestamps: true,
    underscored: true // Maps to created_at and updated_at
  });
};
