const express = require("express");
const cors = require("cors");
const { authenticateUser } = require("./middleware/auth");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Auth Routes
app.use("/api/auth", require("./routes/auth"));

// Products routes
app.use("/api", require("./routes/products"));

// Protected route
app.get("/api/protected", authenticateUser, (req, res) => {
  res.json({
    message: "This is a protected route",
  });
});

app.listen(PORT, () => {
  console.log(`Backend server is runnning on port ${PORT}`);
});
