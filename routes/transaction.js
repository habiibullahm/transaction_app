const express = require("express");
const {
  createTransaction,
  getTransactions,
  getTransaction,
} = require("../controllers/transactionController");
const { isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.get("/getAll", getTransactions);
router.post("/create", isAdmin, createTransaction);
router.get("/getOne/detail", getTransaction);

module.exports = router;
