import Link from "next/link";
import Layout from "./components/Layout";

export default function HomePage() {
  return (
    <Layout>
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Premium Electronics at Unbeatable Prices
          </h1>
          <p className="text-xl mb-8">
            Discover the latest tech gadgets and accessories
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Shop Now
          </button>
        </div>
      </section>
    </Layout>
  );
}
