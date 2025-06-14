"use client";

import Layout from "../Componentes/layout";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import "../../i18n";

export default function Atuacao() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="bg-white py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 px-8 text-gray-700 max-w-7xl mx-auto">
          <div className="w-full md:w-1/2">
            <Image
              src="/refugiadoz2.png"
              alt={t("atuacao.imageAlt")}
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-md object-cover"
              priority
            />
          </div>

          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-blue-700 mb-6">
              {t("atuacao.title")}
            </h1>

            <p className="text-lg mb-4">{t("atuacao.description1")}</p>
            <p className="text-lg mb-4">{t("atuacao.description2")}</p>
            <p className="text-lg font-bold">{t("atuacao.description3")}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
