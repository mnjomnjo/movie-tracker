import jwt from "jsonwebtoken";

/**
 * 🔐 Auth Middleware
 * Protects routes using JWT
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // ❌ No token provided
  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    // 🔥 Extract token from "Bearer TOKEN"
    const token = authHeader.split(" ")[1];

    // 🔍 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 💾 Attach user data to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default authMiddleware;