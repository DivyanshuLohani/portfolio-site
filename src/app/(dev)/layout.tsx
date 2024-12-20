import BgParticles from "@/components/BgParticles";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import React from "react";

export default function DevLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <BgParticles />
      {children}
      <Footer />
    </>
  );
}
