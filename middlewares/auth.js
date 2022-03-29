const { User } = require("../models");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");

module.exports = {
  isLogin: async (req, res, next) => {
    try {
      let token = req.header("Authorization");
      if (!token) {
        return res.status(401).json({
          status: "Unauthorized",
          message: "No token detected",
        });
      }
      token = token.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      const user = await User.findOne({
        where: {
          id: decoded.id,
        },
      });
      if (!user) {
        return res.status(401).json({
          status: "Unauthorized",
          message: "User not found",
        });
      }
      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      next();
    } catch (error) {
      errorHandler(error, res);
    }
  },
  isAdmin: async (req, res, next) => {
    try {
      let token = req.header("Authorization");
      if (!token) {
        return res.status(401).json({
          status: "Unauthorized",
          message: "No token detected",
          result: {},
        });
      }
      token = token.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

      const user = await User.findOne({
        where: {
          id: decoded.id,
        },
      });
      if (!user) {
        return res.status(401).json({
          status: "Unauthorized",
          message: "User not found",
          result: {},
        });
      }
      if (user.role != "admin") {
        return res.status(401).json({
          status: "Unauthorized",
          message: "You have no right to access this end point",
          result: {},
        });
      }
      req.user = {
        id: user.id,
        email: user.email,
        role: user.status,
      };
      next();
    } catch (error) {
      errorHandler(error, res);
    }
  },
};
