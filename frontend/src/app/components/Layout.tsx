import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-blue-600">TechHub</div>
            <ul className="flex space-x-8">
              <li>
                <Link
                  href="/products"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Products
                </Link>
              </li>
              <Link href="/cart" className="text-gray-700 hover:text-blue-600">
                Cart
              </Link>
              <li>
                <Link href="/login">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Login
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
