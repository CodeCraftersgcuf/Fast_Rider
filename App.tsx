import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigation } from "./src/navigation";
import { OrderProvider } from "./src/contexts/OrderContext";
import { AuthProvider } from "./src/contexts/AuthContext";

// Create a new query client instance
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AuthProvider>
          <OrderProvider>
            <Navigation />
          </OrderProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
