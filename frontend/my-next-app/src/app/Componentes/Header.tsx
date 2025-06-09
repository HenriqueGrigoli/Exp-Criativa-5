"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  return (
    <header className="bg-blue-700">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo ampliada */}
        <div className="flex items-center">
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
        </div>


        <nav className="hidden md:flex space-x-8 mx-8">
          <Link 
            href="/SobreIris" 
            className="text-white-800 hover:text-gray-900 font-semibold text-lg transition-colors py-2 px-1 border-b-2 border-transparent hover:border-blue-600"
          >
            Sobre a IRIS
          </Link>
          <Link 
            href="/atuacao" 
            className="text-white-800 hover:text-gray-900 font-semibold text-lg transition-colors py-2 px-1 border-b-2 border-transparent hover:border-blue-600"
          >
            O que fazemos
          </Link>
          <Link 
            href="/Cadastro" 
            className="text-white-800 hover:text-gray-900 font-semibold text-lg transition-colors py-2 px-1 border-b-2 border-transparent hover:border-blue-600"
          >
            Ajude os refugiados
          </Link>
        </nav>
        
        {/* Botão de doação mais destacado */}
        <div className="ml-4">
          <button 
            className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105"
            onClick={() => router.push("/Doacoes")}
          >
            DOE AGORA
          </button>
        </div>
      </div>
    </header>
  );
}
