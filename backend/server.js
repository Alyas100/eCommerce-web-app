const express = require("express");
const cors = require("cors");
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

// Routes
app.use("/api/auth", require("./routes/auth"));

// Protected route example
app.get("/api/protected", (req, res) => {
  // add auth middleware here later
  res.json({ message: "This is a protected route" });
});

app.listen(PORT, () => {
  console.log(`Backend server is runnning on port ${PORT}`);
});
