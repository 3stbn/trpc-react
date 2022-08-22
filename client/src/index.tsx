import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./utils/trpc";
import "@fortawesome/fontawesome-free/css/all.css";
import "bulma/css/bulma.css";
import "bulma-slider/dist/css/bulma-slider.min.css";
import { AppProvider } from "./context/AppContext";

const trpcUrl = "http://localhost:4000/trpc";
const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  url: trpcUrl,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
