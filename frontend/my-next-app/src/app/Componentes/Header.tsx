'use client';

import '../../i18n';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === "pt" ? "en" : "pt";
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // 🚫 Evita hydration mismatch

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

        {/* Menu desktop */}
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

        {/* Botões */}
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
      </div>
    </header>
  );
}
