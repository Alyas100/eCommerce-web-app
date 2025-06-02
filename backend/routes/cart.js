const express = require("express");
const { prisma } = require("../lib/prisma");
const { authenticateUser } = require("../middleware/auth");
const router = express.Router();

// GET /api/cart - Get all cart items for authenticated user
router.get("/cart", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all cart items for the user with product details
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: userId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            image_url: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Most recent items first
      },
    });

    // Calculate cart totals
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );

    res.status(200).json({
      success: true,
      data: {
        items: cartItems,
        summary: {
          totalItems,
          totalPrice: parseFloat(totalPrice.toFixed(2)),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart items",
    });
  }
});

// update quantity of item in cart
router.patch("/cart/update/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    // Validate quantity
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    // Update cart item
    const updatedItem = await prisma.cartItem.update({
      where: {
        id: id,
        userId: userId,
      },
      data: { quantity: quantity },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            image_url: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update cart item",
    });
  }
});

// DELETE - to remove item on cart
router.delete("/cart/remove/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Delete cart item
    await prisma.cartItem.delete({
      where: {
        id: id,
        userId: userId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
    });
  } catch (error) {
    console.error("Error removing cart item:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove cart item",
    });
  }
});

// Add product to cart
router.post("/cart/add", authenticateUser, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if item already exists in cart
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    let cartItem;

    if (existingCartItem) {
      // Update quantity if item already exists
      cartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          userId: userId,
          productId: productId,
          quantity: quantity,
        },
      });
    }

    // Return success response with cart item details
    res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      cartItem: {
        id: cartItem.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        product: {
          name: product.name,
          price: product.price,
          image_url: product.image_url,
        },
      },
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
});

module.exports = router;
