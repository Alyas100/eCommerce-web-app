"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";

// Define the product type
interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from API
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <Layout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Our Products
          </h1>
          <p className="text-gray-600">
            Discover premium electronics and tech accessories
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-12">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found matching your criteria.
            </p>
          </div>
        )}
      </main>
    </Layout>
  );
}
