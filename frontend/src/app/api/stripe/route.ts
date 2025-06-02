export async function POST(request: Request) {
  try {
    // Get form data from the request
    const body = await request.json();
    const { formData, orderTotal } = body;

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/create-payment-intent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: orderTotal || 5494.5, // Use dynamic total
          customerInfo: {
            email: formData.email,
            name: `${formData.firstName} ${formData.lastName}`,
          },
          orderDetails: {
            orderId: `order_${Date.now()}`, // Generate unique order ID
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
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
