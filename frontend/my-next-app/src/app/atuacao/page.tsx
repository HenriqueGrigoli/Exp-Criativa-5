"use client";

import Layout from "../Componentes/layout";
import Image from "next/image";

export default function Atuacao() {
  return (
    <Layout>
      <div className="bg-white py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 px-8 text-gray-700 max-w-7xl mx-auto">
          <div className="w-full md:w-1/2">
            <Image
              src="/refugiadoz2.png"
              alt="Refugiados"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-md object-cover"
              priority
            />
          </div>

          {/* Bloco de texto */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-blue-700 mb-6">
              Como Atuamos ao Lado dos Refugiados
            </h1>

            <p className="text-lg mb-4">
              Acolhemos quem chega ao Brasil, garantindo abrigo, alimentação e cuidados básicos.
            </p>
            <p className="text-lg mb-4">
              Facilitamos documentação, oferecemos apoio psicológico e cursos de língua e capacitação profissional.
            </p>
            <p className="text-lg font-bold">
              Com sua ajuda, transformamos acolhimento em novas oportunidades. Junte-se a nós!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
