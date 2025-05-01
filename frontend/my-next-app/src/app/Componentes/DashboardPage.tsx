"use client";

import { useRouter } from 'next/navigation';
import Layout from '../Componentes/layout';

export default function DashboardPage() {
  const router = useRouter();

  const cards = [
    {
      title: "Usuários",
      description: "Gerencie todos os usuários do sistema",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      route: "/admin/usuarios"
    },
    {
      title: "Documentos",
      description: "Visualize e gerencie documentos",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      route: "/admin/documentos"
    },
    {
      title: "Configurações",
      description: "Configure as preferências do sistema",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      route: "/admin/configuracoes"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Administrativo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div 
              key={index}
              onClick={() => router.push(card.route)}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer 
                        hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 text-indigo-600">
                  {card.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h2>
                <p className="text-gray-600">{card.description}</p>
                <button className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg 
                                  hover:bg-indigo-200 transition-colors">
                  Acessar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}