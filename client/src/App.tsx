import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { trpc } from "./utils/trpc";
import HelloWorld from "./components/HelloWorld";

const trpcUrl = "http://localhost:4000/trpc";
const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  url: trpcUrl,
});
function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <HelloWorld />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
