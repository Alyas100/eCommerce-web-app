// Updated backend API to match your actual schema
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { PrismaClient } = require("@prisma/client");
const nodemailer = require("nodemailer");

const prisma = new PrismaClient();

// Email setup (optional)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Confirm Payment and Complete Order
router.post("/confirm-payment", async (req, res) => {
  try {
    const { paymentIntentId, orderData } = req.body;

    // 1. CONFIRM PAYMENT with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        error: "Payment not successful",
        status: paymentIntent.status,
      });
    }

    // 2. CREATE OR FIND USER (since your schema requires userId)
    let user = await prisma.user.findUnique({
      where: { email: orderData.email },
    });

    if (!user) {
      // Create new user if doesn't exist
      user = await prisma.user.create({
        data: {
          email: orderData.email,
          name: `${orderData.firstName} ${orderData.lastName}`,
        },
      });
    }

    // 3. CREATE ADDRESS (optional - store shipping address)
    const address = await prisma.address.create({
      data: {
        userId: user.id,
        street: orderData.address,
        city: orderData.city,
        state: "Unknown", // You don't collect state, so default
        zipCode: orderData.zipCode,
        country: "US", // Assuming US, adjust as needed
        isDefault: false,
      },
    });

    // 4. SAVE ORDER TO DATABASE (using your schema fields)
    const order = await prisma.order.create({
      data: {
        orderNumber: orderData.orderId, // Maps to your orderNumber field
        userId: user.id, // Required in your schema
        status: "PROCESSING", // Using your OrderStatus enum
        totalAmount: orderData.amount, // Maps to your totalAmount field
        orderItems: {
          create: orderData.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        orderItems: true,
        user: true,
      },
    });

    // 5. UPDATE INVENTORY - SKIP THIS STEP
    // Your Product model doesn't have a stock/inventory field
    // You'd need to add 'stock Int @default(0)' to Product model first
    console.log("Skipping inventory update - no stock field in Product model");

    // 6. SEND CONFIRMATION EMAIL (optional)
    try {
      const emailHtml = `
        <h2>Order Confirmation</h2>
        <p>Hi ${orderData.firstName},</p>
        <p>Thank you for your order!</p>
        
        <h3>Order #${orderData.orderId}</h3>
        <ul>
          ${orderData.items
            .map(
              (item) =>
                `<li>${item.name} x ${item.quantity} - $${(
                  item.price * item.quantity
                ).toFixed(2)}</li>`
            )
            .join("")}
        </ul>
        
        <p><strong>Total: $${orderData.amount}</strong></p>
        <p>Shipping Address: ${orderData.address}, ${orderData.city} ${
        orderData.zipCode
      }</p>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: orderData.email,
        subject: `Order Confirmation #${orderData.orderId}`,
        html: emailHtml,
      });
    } catch (emailError) {
      console.log(
        "Email failed (but order still processed):",
        emailError.message
      );
    }

    res.json({
      success: true,
      order: order,
      message: "Order completed successfully",
    });
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({
      error: "Failed to complete order",
      message: error.message,
    });
  }
});

// Get Order Status (updated for your schema)
router.get("/order/:orderNumber", async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

module.exports = router;
