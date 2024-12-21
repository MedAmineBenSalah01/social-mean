const errorHandler = (err, req, res, next) => {
    const { code, message } = err;
  
    if (!code || !message) {
      console.error(err.stack);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error_type: "SYSTEM" });
    }
    next(err);
  };
  
  module.exports = errorHandler;
  