'use client'
import Navigation from "@/components/Navigation";
import { Web3Provider } from "@/components/providers/Web3Provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConnectKitButton } from "connectkit";

export default function Home() {
  return (
    <Web3Provider>
      <div className="absolute right-8 top-4 z-20">
        <ConnectKitButton />
      </div>
      <div className="flex p-2 md:px-4 gap-2 md:gap-0 h-[100vh] overflow-hidden">
        <Navigation />
        <main
          className="w-full px-0 md:px-8 overflow-y-auto pt-4 pb-12 max-w-[1200px] mx-auto"
        >
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="search" placeholder="Fill with your token address" />
            <Button type="submit">Subscribe</Button>
          </div>

        </main>
      </div>
    </Web3Provider>
  );
}
