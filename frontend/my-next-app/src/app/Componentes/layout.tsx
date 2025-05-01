"use client";

import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer"; // Import the Footer component
import "../globals.css";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="app-container flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}