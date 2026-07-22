import * as React from "react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main id="main" className="flex-1 pt-16 md:pt-20">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
