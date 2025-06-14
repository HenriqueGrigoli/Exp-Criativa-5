"use client";

import SobreIrisLayout from "../Componentes/SobreIrisLayout";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import '../../i18n';

export default function SobreIrisPage() {
  const { t } = useTranslation();

  return (
    <SobreIrisLayout>
      <div className="bg-white py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 px-8 max-w-7xl mx-auto text-gray-700">
          <div className="w-full md:w-1/2">
            <Image
              src="/Imigrantes.png"
              alt={t("about.alt")}
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-md object-cover"
              priority
            />
          </div>

          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-blue-700 mb-6">
              {t("about.title")}
            </h1>

            <p className="text-lg mb-4">{t("about.description1")}</p>
            <p className="text-lg mb-4">{t("about.description2")}</p>
            <p className="text-lg mb-4">{t("about.description3")}</p>
            <p className="text-lg mb-4">{t("about.description4")}</p>
          </div>
        </div>
      </div>
    </SobreIrisLayout>
  );
}
