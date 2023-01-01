import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./utils/trpc";
import "@fortawesome/fontawesome-free/css/all.css";
import "bulma/css/bulma.css";
import "bulma-slider/dist/css/bulma-slider.min.css";
import { AppProvider } from "./context/AppContext";
import { httpBatchLink } from "@trpc/client";

const trpcUrl = "http://localhost:4000/trpc";
const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: trpcUrl,
    }),
  ],
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </trpc.Provider>
    </AppProvider>
  </React.StrictMode>
);
