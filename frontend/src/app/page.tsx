'use client'
 
import Navigation from "@/components/Navigation";
import { Web3Provider } from "@/components/providers/Web3Provider";
import { ConnectKitButton } from "connectkit";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Web3Provider>
          <div className="fixed right-8 top-4 z-20">
            <ConnectKitButton />
          </div>
          <div className="flex p-2 md:px-4 gap-2 md:gap-0 h-[100vh] overflow-hidden">
            <Navigation />
            <div
              className="w-full px-0 md:px-8 overflow-y-auto pt-4 pb-12 max-w-[1200px] mx-auto"
            >
              <Dashboard />

            </div>
          </div>
        </Web3Provider>
      </QueryClientProvider>
    </div>
  );
}
