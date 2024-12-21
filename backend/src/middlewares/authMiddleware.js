const userModel = require("../models/userModel");
const { verifyJWT } = require("../utils/jwt");
const authMiddleware = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      var token = req.headers.authorization;
      if (!token) return res.status(403).json({ message: "Access denied" });
      token = token.split(" ")[1];
      var decoded = await verifyJWT(token);
      var user = await userModel.findById(decoded._id).exec();
      if (!user) return res.status(403).json({ message: "Access denied" });
      if (allowedRoles && !allowedRoles.includes(user.role))
        return res.status(403).json({ message: "Not allowed" });
      req.user = user;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Access denied" });
    }
  };
};

module.exports = authMiddleware;
