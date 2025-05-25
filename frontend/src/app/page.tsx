// First iteration - plain structure
export default function HomePage() {
  return (
    <div>
      <header>
        <nav>
          <div>TechHub</div>
          <ul>
            <li>Products</li>
            <li>Ctegories</li>
            <li>Cart</li>
          </ul>
        </nav>
      </header>

      <main>
        <section>
          <h1>Premium Electronics at Unbeatable Prices</h1>
          <p>Discover the latest tech gadgets and accessories</p>
          <button>Show Now</button>
        </section>

        <section>
          <h2>Featured Products</h2>
          <div>{/*Product cards*/}</div>
        </section>
      </main>
    </div>
  );
}
