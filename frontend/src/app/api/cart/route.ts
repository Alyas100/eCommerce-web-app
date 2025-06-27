import { NextRequest } from "next/server";

// Get all items from cart
export async function GET() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/cart`, {
      headers: {
        Authorization: "Bearer valid-token",
      },
    });

    const cartItems = await response.json();

    return Response.json(cartItems.data.items);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch cart items" },
      { status: 500 }
    );
  }
}

// Update cart item quantity
export async function PATCH(request: Request) {
  try {
    const { id, quantity } = await request.json();

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/cart/update/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer valid-token",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: result.message || "Failed to update cart item" },
        { status: response.status }
      );
    }

    return Response.json(result);
  } catch (error) {
    return Response.json(
      { error: "Failed to update cart item" },
      { status: 500 }
    );
  }
}

// Delete a cart item
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/cart/remove/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer valid-token",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: result.message || "Failed to remove cart item" },
        { status: response.status }
      );
    }

    return Response.json(result);
  } catch (error) {
    return Response.json(
      { error: "Failed to remove cart item" },
      { status: 500 }
    );
  }
}

// Add item to cart
export async function POST(request: Request) {
  try {
    const { productId, quantity } = await request.json();

    const response = await fetch(`${process.env.BACKEND_URL}/api/cart/add`, {
      method: "POST",
      headers: {
        Authorization: "Bearer valid-token",
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
