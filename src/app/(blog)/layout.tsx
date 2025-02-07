import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import React from "react";

export default function DevLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main className="py-12 md:py-16 lg:py-20">{children}</main>
      <Footer />
    </>
  );
}
