'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, { as : "createdBy", foreignKey : "user_id"})
    }
  }
  Transaction.init({
    product_name: DataTypes.STRING,
    unit_price: DataTypes.INTEGER,
    total_unit: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    total_transaction: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};