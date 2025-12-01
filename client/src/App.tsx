import Header from "./components/Header";
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <div className="bg-background w-full flex flex-col">
      <div className="bg-secondary-background p-4 w-full flex items-center justify-center border-b">
        {/* HEADER */}
        <Header />
      </div>

      {/* BODY */}
      <div className="p-4 w-full flex items-center justify-center">
        <div className="flex flex-col gap-4 w-5xl">
          <div className="flex flex-col">
            <h1 className="text-xl">Products</h1>
            <p className="text-muted-foreground text-sm">
              3 products in inventory
            </p>
          </div>

          {/* Product Card */}
          <ProductCard />

        </div>
      </div>
    </div>
  );
}

export default App;
