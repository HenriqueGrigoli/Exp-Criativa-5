"use client";

import "../../i18n";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === "pt" ? "en" : "pt";
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Evita erros de hydration

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
              style={{ objectFit: "contain" }}
              priority
              sizes="(max-width: 768px) 100px, 192px"
            />
          </div>
        </Link>

        {/* Botão hamburger - Mobile */}
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex space-x-8 mx-8">
          <Link href="/SobreIris" className="text-white font-semibold text-lg hover:underline">
            {t("menu.about")}
          </Link>
          <Link href="/atuacao" className="text-white font-semibold text-lg hover:underline">
            {t("menu.whatWeDo")}
          </Link>
          <Link href="/Cadastro" className="text-white font-semibold text-lg hover:underline">
            {t("menu.helpRefugees")}
          </Link>
        </nav>

        {/* Botões Desktop */}
        <div className="hidden md:flex space-x-4 items-center">
          <button
            onClick={toggleLanguage}
            className="text-white border border-white rounded-full px-4 py-1 hover:bg-white hover:text-blue-700 transition"
          >
            {i18n.language === "pt" ? "EN" : "PT"}
          </button>

          <button
            className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105"
            onClick={() => router.push("/Doacoes")}
          >
            {t("menu.donate")}
          </button>
        </div>

        {/* Menu para celular } */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-blue-700 shadow-md md:hidden flex flex-col items-center py-4 space-y-4 z-50">
            <Link
              href="/SobreIris"
              onClick={() => setMenuOpen(false)}
              className="text-white text-lg"
            >
              {t("menu.about")}
            </Link>
            <Link
              href="/atuacao"
              onClick={() => setMenuOpen(false)}
              className="text-white text-lg"
            >
              {t("menu.whatWeDo")}
            </Link>
            <Link
              href="/Cadastro"
              onClick={() => setMenuOpen(false)}
              className="text-white text-lg"
            >
              {t("menu.helpRefugees")}
            </Link>
            <button
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-5 rounded-lg shadow-lg transition-all"
              onClick={() => {
                setMenuOpen(false);
                router.push("/Doacoes");
              }}
            >
              {t("menu.donate")}
            </button>
            <button
              onClick={() => {
                toggleLanguage();
                setMenuOpen(false);
              }}
              className="text-white border border-white rounded-full px-4 py-1 hover:bg-white hover:text-blue-700 transition"
            >
              {i18n.language === "pt" ? "EN" : "PT"}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
