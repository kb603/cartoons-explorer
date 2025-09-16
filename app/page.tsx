import CartoonExplorerWithHandler from "@/components/CartoonExploererWithHandler";
import { OfflineBanner } from "@/components/OfflineBanner";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Cartoon Explorer
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover your favorite 2D cartoons
          </p>
        </header>

        <OfflineBanner />

        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <CartoonExplorerWithHandler />
        </Suspense>
      </div>
    </div>
  );
}
