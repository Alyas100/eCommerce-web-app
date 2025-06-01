export async function POST(request: {
  json: () =>
    | PromiseLike<{ productId: any; quantity: any }>
    | { productId: any; quantity: any };
}) {
  try {
    // Get the request data
    const { productId, quantity } = await request.json();

    // Make request to your Node.js backend
    const response = await fetch(`${process.env.BACKEND_URL}/api/cart/add`, {
      method: "POST",
      headers: {
        Authorization: "Bearer valid-token", // Your test token
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: result.error || "Failed to add to cart" },
        { status: response.status }
      );
    }

    return Response.json(result);
  } catch (error) {
    console.error("Add to cart error:", error);
    return Response.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}
