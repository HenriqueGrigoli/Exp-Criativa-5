"use client";

import Link from "next/link";
import "../header.css";
import { useRouter } from 'next/navigation';


export default function Header() {
  const router = useRouter();
  return (
    <header className="header">
      <div className="iris-container">
        <a href="./"><span className="iris-title">IRIS</span></a>
        <a href="./"><span className="iris-subtitle">Integração de Refugiados e Inclusão Social</span></a>
      </div>

      <nav className="header-menu">
        <Link href="/sobre">Sobre a IRIS</Link>
        <Link href="/atuacao">O que fazemos</Link>
        <Link href="/ajuda">Ajude os refugiados</Link>
      </nav>

      <div className="header-buttons">
          <button className="donate-button"
           onClick={() => router.push("/Doacoes")}
            >DOE AGORA</button>
        </div>
    </header>
  );
}