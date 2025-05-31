"use client";
import Link from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";

export default function ProductsPage() {
  // Sample product data
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 999,
      category: "smartphones",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 324,
    },
    {
      id: 2,
      name: "MacBook Air M2",
      price: 1199,
      category: "laptops",
      image:
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 456,
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      price: 399,
      category: "headphones",
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 891,
    },
    {
      id: 4,
      name: "Samsung Galaxy S24",
      price: 899,
      category: "smartphones",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 234,
    },
    {
      id: 5,
      name: "Dell XPS 13",
      price: 1099,
      category: "laptops",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 167,
    },
    {
      id: 6,
      name: "iPad Pro 12.9",
      price: 1099,
      category: "tablets",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 423,
    },
    {
      id: 7,
      name: "AirPods Pro",
      price: 249,
      category: "headphones",
      image:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop",
      rating: 4.4,
      reviews: 1203,
    },
    {
      id: 8,
      name: 'Gaming Monitor 27"',
      price: 599,
      category: "monitors",
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 89,
    },
  ];

  const categories = [
    { id: "all", name: "All Products" },
    { id: "smartphones", name: "Smartphones" },
    { id: "laptops", name: "Laptops" },
    { id: "tablets", name: "Tablets" },
    { id: "headphones", name: "Headphones" },
    { id: "monitors", name: "Monitors" },
  ];

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
