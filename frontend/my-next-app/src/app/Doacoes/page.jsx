"use client";

import { useState } from "react";
import axios from "axios";
import Layout from "../Componentes/layout";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import "../../i18n";

export default function Doacoes() {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [urlBoleto, setUrlBoleto] = useState("");
  const [digitableLine, setDigitableLine] = useState("");
  const [valor, setValor] = useState("");

  async function gerarBoleto() {
    if (!valor || isNaN(Number(valor)) || parseFloat(valor) <= 0) {
      alert(t("donate.errors.invalidValue"));
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
        alert(t("donate.errors.problem"));
      }
    } catch (error) {
      alert(t("donate.errors.unexpected"));
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
              alt={t("donate.imageAlt")}
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          </div>

          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-blue-700 mb-6">
              {t("donate.title")}
            </h1>

            <p className="text-lg mb-4">{t("donate.description1")}</p>
            <p className="text-lg mb-4">{t("donate.description2")}</p>
            <p className="text-lg mb-4">{t("donate.description3")}</p>
            <p className="text-lg font-bold mb-6">{t("donate.description4")}</p>

            {!urlBoleto ? (
              <div className="flex flex-col gap-4">
                <input
                  type="number"
                  placeholder={t("donate.inputPlaceholder")}
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  className="border border-gray-300 rounded px-4 py-2 text-center"
                />
                <button
                  onClick={gerarBoleto}
                  disabled={loading}
                  className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
                >
                  {loading ? t("donate.generating") : t("donate.generateButton")}
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
                  {t("donate.openSlip")}
                </a>
                <p className="mt-4 font-bold">{t("donate.slipNumber")}:</p>
                <p>{digitableLine}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
