"use client";

import { useState } from "react";
import axios from "axios";
import Layout from "../Componentes/layout";
import Image from "next/image";

export default function Doacoes() {
  const [loading, setLoading] = useState(false);
  const [urlBoleto, setUrlBoleto] = useState("");
  const [digitableLine, setDigitableLine] = useState("");
  const [valor, setValor] = useState("");

  async function gerarBoleto() {
    if (!valor || isNaN(valor) || parseFloat(valor) <= 0) {
      alert("Informe um valor válido para a doação.");
      return;
    }

    setLoading(true);

    try {
      const resposta = await axios.post("/api/gerarboleto", {
        valor: parseFloat(valor),
      });

      const data = resposta.data;

      if (data?.url_slip) {
        setUrlBoleto(data.url_slip);
        setDigitableLine(data.digitable_line);
      } else {
        alert("Estamos com problema, tente novamente mais tarde");
      }
    } catch (error) {
      alert("Erro inesperado, verifique o console.");
    }

    setLoading(false);
  }

  return (
    <Layout>
      <div className="bg-white py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 px-8 text-gray-700 max-w-7xl mx-auto">
          <div className="w-full md:w-1/2">
            <Image
              src="/refugiadoz.png"
              alt="Refugiados"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          </div>

          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-blue-700 mb-6">
              Ajude a Transformar Vidas
            </h1>

            <p className="text-lg mb-4">
              Estamos promovendo uma campanha de arrecadação para apoiar refugiados que chegaram recentemente ao Brasil.
            </p>
            <p className="text-lg mb-4">
              As doações serão utilizadas para cobrir <strong>necessidades básicas</strong> como alimentação, roupas, medicamentos e transporte.
            </p>
            <p className="text-lg mb-4">
              Parte da sua doação também será destinada a <strong>ajudar famílias e indivíduos</strong> que estão generosamente cedendo suas casas.
            </p>
            <p className="text-lg font-bold mb-6">
              Juntos, podemos oferecer acolhimento, dignidade e esperança.
            </p>

            {!urlBoleto ? (
              <div className="flex flex-col gap-4">
                <input
                  type="number"
                  placeholder="Digite o valor da doação"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  className="border border-gray-300 rounded px-4 py-2 text-center"
                />
                <button
                  onClick={gerarBoleto}
                  disabled={loading}
                  className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
                >
                  {loading ? "Gerando Boleto..." : "Gerar Boleto"}
                </button>
              </div>
            ) : (
              <div className="text-center">
                <a
                  href={urlBoleto}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition mt-4"
                >
                  Abrir Boleto
                </a>
                <p className="mt-4 font-bold">Número do boleto:</p>
                <p>{digitableLine}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
