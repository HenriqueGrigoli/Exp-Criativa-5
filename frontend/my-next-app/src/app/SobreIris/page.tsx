"use client";

import SobreIrisLayout from "../Componentes/SobreIrisLayout";
import Image from "next/image";

export default function SobreIrisPage() {
  return (
    <SobreIrisLayout>
      <div className="bg-white py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 px-8 max-w-7xl mx-auto text-gray-700">
          <div className="w-full md:w-1/2">
            <Image
              src="/Imigrantes.png"
              alt="Imagem ilustrativa IRIS"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-md object-cover"
              priority
            />
          </div>

          {/* Bloco de texto */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-blue-700 mb-6">Sobre a IRIS</h1>

            <p className="text-lg mb-4">
              A IRIS é uma organização sem fins lucrativos dedicada a oferecer suporte humanitário a refugiados.
            </p>

            <p className="text-lg mb-4">
              Atuamos conectando voluntários, doadores e famílias em situação de vulnerabilidade para promover acolhimento digno e oportunidades reais de integração.
            </p>

            <p className="text-lg mb-4">
              O IRIS é uma iniciativa que visa facilitar a comunicação, gestão e integração de ações sociais em prol de pessoas em situação de vulnerabilidade.
              O sistema foi desenvolvido para ONGs, instituições beneficentes e voluntários que desejam promover a solidariedade de maneira organizada e transparente.
            </p>

            <p className="text-lg mb-4">
              Com foco em acessibilidade, transparência e usabilidade, o IRIS oferece ferramentas para cadastro de doadores, beneficiários, registro de doações e gestão de relatórios.
            </p>
          </div>
        </div>
      </div>
    </SobreIrisLayout>
  );
}
