import React from "react";

export default function SongLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      {/* <Footer /> */}
    </>
  );
}
