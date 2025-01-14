'use client'

import Navigation from "@/components/Navigation";
import { Web3Provider } from "@/components/providers/Web3Provider";
import SearchModule from "@/components/SearchModule";
import { ConnectKitButton } from "connectkit";

export default function Home({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div>
      <Web3Provider>
        <div className="absolute right-8 top-4 z-20">
          <ConnectKitButton />
        </div>
        <div className="flex p-2 md:px-4 gap-2 md:gap-0 h-[100vh] overflow-hidden">
          <Navigation />
          <div
            className="w-full px-0 md:px-8 overflow-y-auto pt-4 pb-12 max-w-[1200px] mx-auto"
          >
            <SearchModule/>
            <main>
              {children}
            </main>
          </div>
        </div>
      </Web3Provider>
    </div>
  );
}
