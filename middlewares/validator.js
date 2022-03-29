const errorHandler = require("../utils/errorHandler");

module.exports.validate = (schema) => {
  return (req, res, next) => {
    try {
      const body = req.body;
      const { error } = schema.validate(body);
      if (error)
        return res.status(400).json({
          status: "Bad Request",
          message: error.message,
        });
      next();
    } catch (error) {
      errorHandler(error, res);
    }
  };
};
