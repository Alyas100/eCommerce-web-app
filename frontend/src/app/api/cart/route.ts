import { NextRequest } from "next/server";

//get all item from cart
export async function GET() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/cart`, {
      headers: {
        Authorization: "Bearer valid-token", // Add this line
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

// update cart item quantity
export async function PATCH(request: {
  json: () =>
    | PromiseLike<{ id: any; quantity: any }>
    | { id: any; quantity: any };
}) {
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

export async function DELETE(request: {
  json: () => PromiseLike<{ id: any }> | { id: any };
}) {
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

// add item into cart

export async function POST(request: NextRequest) {
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
