"use client";

import Header from './Header';
import Footer from './Footer';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function SobreIrisLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
