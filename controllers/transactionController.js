const joi = require("joi");
const errorHandler = require("../utils/errorHandler");
const { Transaction, User, Payment } = require("../models");
const user = require("../models/user");

module.exports = {
  getTransactions: async (req, res) => {
    try {
      const transactions = await Transaction.findAll({
        include: [
          {
            model: User,
            as: "createdBy",
            attributes: ["username", "role"],
          },
        ],
        attributes: {
          exclude: ["updatedAt", "user_id"],
        },
      });

      if (transactions.length == 0) {
        return res.status(404).json({
          status: "Not Found",
          message: "The data is empty",
          result: [],
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Successfully retrieve the data",
        result: transactions,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  },
  createTransaction: async (req, res) => {
    try {
      const body = req.body;
      const { user } = req;

      const schema = joi.object({
        product_name: joi.string().required(),
        unit_price: joi.number().required(),
        total_unit: joi.number().required(),
        user_id: joi.number().required(),
        total_transaction: joi.number().required(),
      });
      const { error } = schema.validate({
        ...body,
        user_id: user.id,
      });
      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.message,
        });
      }
      const transaction = await Transaction.create({
        ...body,
        user_id: user.id,
      });
      if (!transaction) {
        return res.status(500).json({
          status: "Internal server error",
          message: "Failed to create transaction",
          result: {},
        });
      }
      res.status(201).json({
        status: "Success",
        message: "Successfuly create an transaction",
        result: transaction,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  },
  getTransaction: async (req, res) => {
    const { transactionId } = req.query;
    try {
      const transaction = await Transaction.findOne({
        where: {
          id : transactionId,
        },
        include: [
          {
            model: User,
            as: "createdBy",
            attributes: ["username", "role"],
          },
        ],
        attributes: {
          exclude: ["updatedAt", "user_id"],
        },
      });

      if (!transaction) {
        return res.status(404).json({
          status: "Not Found",
          message: "The data is empty",
          result: [],
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Successfully retrieve the data",
        result: transaction,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  },
};
