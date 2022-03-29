const express = require("express")
const router = express.Router();

const userRoutes = require("./user")
const transactionRoutes = require("./transaction")

router.use("/user", userRoutes);
router.use("/transaction", transactionRoutes)

module.exports = router;