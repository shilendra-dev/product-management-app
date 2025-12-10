import { queryClient } from "./lib/queryClient";
import Inventory from "./pages/Inventory";
import { QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Inventory />
    </QueryClientProvider>
  );
}

export default App;
