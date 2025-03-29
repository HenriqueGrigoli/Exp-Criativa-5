"use client";

import { ReactNode } from "react";
import Header from "./Header";
import "../globals.css";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="app-container">
      <Header />
      <main>{children}</main>
    </div>
  );
}