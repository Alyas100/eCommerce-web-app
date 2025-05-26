const authenticateUser = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No authorization header provided",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Use dummy token hardcoded string first for testing
    // Verify JWT token later
    if (token === "valid-token") {
      // Mock data for adding user info to request object
      req.user = {
        id: 1,
        email: "user@example.com",
        name: "John",
      };
      next(); // Continue to the next middleware/route
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Authentication error",
    });
  }
};

module.exports = {
  authenticateUser,
};
