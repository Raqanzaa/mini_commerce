import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('customer','admin'),
        defaultValue: 'customer'
    }
  }, {
    // The options should be in a single object
    timestamps: true,
    underscored: true
  });
};

