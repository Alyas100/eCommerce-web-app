const express = require("express");
const { prisma } = require("../lib/prisma");
const router = express.Router();

// Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "asc",
      },
    });

    console.log(`Fetched ${products.length} products from database`);

    res.json({
      success: true,
      message: "Products fetched successfully",
      data: products,
      count: products.length,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});

module.exports = router;
