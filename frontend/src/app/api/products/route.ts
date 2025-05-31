export async function GET() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/products`);
    const products = await response.json();

    return Response.json(products.data);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
