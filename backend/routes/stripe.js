const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent --process payment
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency = "usd", customerInfo, orderDetails } = req.body;

    // Validate amount
    if (!amount || amount < 50) {
      // Stripe minimum is $0.50
      return res.status(400).json({
        error: "Amount must be at least $0.50",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: orderDetails?.orderId || "",
        customerEmail: customerInfo?.email || "",
        timestamp: new Date().toISOString(),
      },
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: amount,
      currency: currency,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({
      error: "Failed to create payment intent",
      message: error.message,
    });
  }
});

// Get Payment Status
router.get("/payment-status/:paymentIntentId", async (req, res) => {
  try {
    const { paymentIntentId } = req.params;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100, // Convert back to dollars
      currency: paymentIntent.currency,
      metadata: paymentIntent.metadata,
    });
  } catch (error) {
    console.error("Error retrieving payment:", error);
    res.status(500).json({
      error: "Failed to retrieve payment status",
    });
  }
});

// Process Refund
router.post("/refund", async (req, res) => {
  try {
    const {
      paymentIntentId,
      amount,
      reason = "requested_by_customer",
    } = req.body;

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined, // Partial refund if amount specified
      reason,
    });

    res.json({
      success: true,
      refund: refund,
      refundId: refund.id,
    });
  } catch (error) {
    console.error("Error processing refund:", error);
    res.status(500).json({
      error: "Refund failed",
      message: error.message,
    });
  }
});

module.exports = router;
