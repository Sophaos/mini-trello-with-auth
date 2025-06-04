import { Provider } from "@/components/ui/provider";
import { ApolloProvider } from "@apollo/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { apolloClient } from "./apollo/client.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <Provider>
        <App />
      </Provider>
    </ApolloProvider>
  </StrictMode>
);
