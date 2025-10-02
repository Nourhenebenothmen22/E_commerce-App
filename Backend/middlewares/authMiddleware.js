const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Middleware: Protect
 * ------------------
 * - Checks if a valid JWT token is provided in the request header.
 * - Verifies the token using the secret key.
 * - Retrieves the user (without password) from the database and attaches it to req.user.
 * - If no token or invalid token, returns 401 Unauthorized.
 */
exports.protect = async (req, res, next) => {
  // Get token from Authorization header (Bearer <token>)
  let token =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, token missing" });
  }

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to the request object (excluding password field)
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/**
 * Middleware: isAdmin
 * -------------------
 * - Checks if the authenticated user has the role "admin".
 * - If yes, allows access to the route.
 * - If not, returns 403 Forbidden.
 */
exports.isAdmin = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access restricted to admins only" });
  }
};
