"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-700">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" passHref>
          <div className="relative h-16 w-48 hover:opacity-90 transition-opacity">
            <Image
              src="/logo_iris_somente_logo.png"
              alt="Logo IRIS"
              fill
              style={{ objectFit: 'contain' }}
              priority
              sizes="(max-width: 768px) 100px, 192px"
            />
          </div>
        </Link>

        {/* Botão hamburger para mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex space-x-8 mx-8">
          <Link href="/SobreIris" className="text-white font-semibold text-lg hover:underline">Sobre a IRIS</Link>
          <Link href="/atuacao" className="text-white font-semibold text-lg hover:underline">O que fazemos</Link>
          <Link href="/Cadastro" className="text-white font-semibold text-lg hover:underline">Ajude os refugiados</Link>
        </nav>

        {/* Botão de doação */}
        <div className="hidden md:block">
          <button
            className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105"
            onClick={() => router.push("/Doacoes")}
          >
            DOE AGORA
          </button>
        </div>

        {/* Menu mobile dropdown */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-blue-700 shadow-md md:hidden flex flex-col items-center py-4 space-y-4 z-50">
            <Link href="/SobreIris" onClick={() => setMenuOpen(false)} className="text-white text-lg">Sobre a IRIS</Link>
            <Link href="/atuacao" onClick={() => setMenuOpen(false)} className="text-white text-lg">O que fazemos</Link>
            <Link href="/Cadastro" onClick={() => setMenuOpen(false)} className="text-white text-lg">Ajude os refugiados</Link>
            <button
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-5 rounded-lg shadow-lg transition-all"
              onClick={() => {
                setMenuOpen(false);
                router.push("/Doacoes");
              }}
            >
              DOE AGORA
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
