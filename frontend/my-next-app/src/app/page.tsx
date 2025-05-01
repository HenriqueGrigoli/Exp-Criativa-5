"use client";
import { useRouter } from "next/navigation";
import Layout from "./Componentes/layout";

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <div className="font-sans text-gray-800 leading-relaxed">
        <section className="relative w-full">
          <div className="relative">
            <img 
              src="imigrantes.jpeg" 
              alt="Refugiados em abrigo" 
              className="w-full h-[70vh] object-cover"
            />
            <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center">
              <div className="max-w-6xl mx-auto px-5">
                <h1 className="text-5xl font-bold text-black mb-5 uppercase">SOBRE A IRIS</h1>
                <p className="text-xl text-black max-w-2xl mb-8">
                  A IRIS é uma ONG dedicada a conectar voluntários a refugiados, 
                  promovendo acolhimento, apoio e integração. Facilitamos doações financeiras e de bens essenciais,
                  garantindo que a ajuda chegue a quem mais precisa.
                </p>
                <div className="flex gap-5">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 uppercase transition duration-300">
                    SAIBA MAIS
                  </button>
                  <button 
                    className="bg-transparent hover:bg-white hover:bg-opacity-10 text-white font-semibold py-3 px-8 border-2 border-white uppercase transition duration-300"
                    onClick={() => router.push("/Login")}
                  >
                    ABRIGUE UMA FAMÍLIA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-5 text-center bg-blue-500">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl text-white mb-5">NOSSA MISSÃO</h2>
            <p className="text-lg text-white">
              Nosso principal objetivo é construir uma rede de suporte eficiente e solidária, 
              proporcionando dignidade e novas oportunidades para aqueles que buscam recomeçar.
            </p>
          </div>
        </section>

        <section className="py-16 px-5 text-center bg-white">
          <h2 className="text-4xl text-blue-700 mb-12">COMO VOCÊ PODE AJUDAR</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-2xl font-bold mb-4 text-blue-700">DOAÇÕES</h3>
              <p>Contribua com recursos financeiros para nossas ações.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-2xl font-bold mb-4 text-blue-700">VOLUNTARIADO</h3>
              <p>Ofereça seu tempo e habilidades para apoiar refugiados.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-2xl font-bold mb-4 text-blue-700">ABRIGO</h3>
              <p>Forneça moradia temporária para famílias em necessidade.</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}