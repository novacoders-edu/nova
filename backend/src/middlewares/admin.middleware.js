const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const adminMiddleware = async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided."
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await userModel.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. User not found."
      });
    }

    // Check if user is admin (you can modify this logic based on your user model)
    // For now, checking if email contains 'admin' or if there's an isAdmin field
    const isAdmin = user.email.includes('admin') || user.isAdmin === true || user.role === 'admin';
    
    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required."
      });
    }

    // Add user to request object
    req.user = user;
    next();
    
  } catch (error) {
    console.error("Admin middleware error:", error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: "Invalid token."
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token expired."
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};

module.exports = { adminMiddleware };