// Second iteration - add styling
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-blue-600">TechHub</div>
            <ul className="flex space-x-8">
              <li className="text-gray-700 hover:text-blue-600">Products</li>
              <li className="text-gray-700 hover:text-blue-600">Categories</li>
              <li className="text-gray-700 hover:text-blue-600">Cart</li>
            </ul>
          </div>
        </nav>
      </header>

      <main>
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
      </main>
    </div>
  );
}
