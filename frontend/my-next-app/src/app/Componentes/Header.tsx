"use client";

import Link from "next/link";
import Image from "next/image";
import "../header.css";
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  return (
    <header className="bg-indigo-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center">
        {/* Logo como imagem - FORMA CORRETA */}
        <div className="mr-4 flex items-center">
          <Link href="/" passHref>
            <div className="relative h-10 w-32"> {/* Container com tamanho definido */}
              <Image
                src="/logo_iris.png" // Caminho na pasta public
                alt="Logo IRIS"
                fill // Preenche o container pai
                style={{ objectFit: 'contain' }} // Mantém proporção
                priority
              />
            </div>
          </Link>
        </div>

        {/* Menu de navegação */}
        <nav className="hidden md:flex space-x-6 mx-6"> {/* Adicionei margem horizontal */}
          <Link 
            href="/sobre" 
            className="text-blue-700 hover:text-blue-900 font-medium transition-colors"
          >
            Sobre a IRIS
          </Link>
          <Link 
            href="/atuacao" 
            className="text-blue-700 hover:text-blue-900 font-medium transition-colors"
          >
            O que fazemos
          </Link>
          <Link 
            href="/ajuda" 
            className="text-blue-700 hover:text-blue-900 font-medium transition-colors"
          >
            Ajude os refugiados
          </Link>
        </nav>
        
        {/* Botão de doação com espaçamento */}
        <div className="ml-4"> {/* Adicionei margem à esquerda */}
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors" 
            onClick={() => router.push("/Doacoes")}
          >
            DOE AGORA
          </button>
        </div>
      </div>
    </header>
  );
}