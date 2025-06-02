export async function POST(request: Request) {
  try {
    // Get form data from the request
    const body = await request.json();
    const {
      formData,
      orderTotal,
      confirmPayment = false,
      paymentIntentId,
    } = body;

    // If this is a payment confirmation request
    if (confirmPayment && paymentIntentId) {
      // Call backend to confirm payment and complete order
      const confirmResponse = await fetch(
        `${process.env.BACKEND_URL}/api/confirm-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentIntentId,
            orderData: {
              orderId: `order_${Date.now()}`,
              email: formData.email,
              firstName: formData.firstName,
              lastName: formData.lastName,
              address: formData.address,
              city: formData.city,
              zipCode: formData.zipCode,
              amount: orderTotal,
              items: [
                {
                  productId: "prod_iphone15pro",
                  name: "iPhone 15 Pro",
                  quantity: 5,
                  price: 999,
                },
              ],
            },
          }),
        }
      );

      const confirmResult = await confirmResponse.json();
      return Response.json(confirmResult);
    }

    // Otherwise, create payment intent (existing logic)
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/create-payment-intent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: orderTotal || 5494.5,
          customerInfo: {
            email: formData.email,
            name: `${formData.firstName} ${formData.lastName}`,
          },
          orderDetails: {
            orderId: `order_${Date.now()}`,
            address: formData.address,
            city: formData.city,
            zipCode: formData.zipCode,
          },
        }),
      }
    );

    const result = await response.json();
    return Response.json(result);
  } catch (error) {
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
