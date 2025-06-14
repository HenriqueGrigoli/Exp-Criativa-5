'use client';

import Layout from "../Componentes/layout";
import { useTranslation } from "react-i18next";
import '../../i18n';

export default function TermosDeUso() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="bg-white">
        <div className="bg-white py-20 px-8 max-w-5xl mx-auto text-gray-800 space-y-6">
          <h1 className="text-3xl font-bold text-blue-700">{t('terms.title')}</h1>

          <p>{t('terms.intro')}</p>

          <h2 className="text-xl font-semibold mt-8">{t('terms.sections.acceptance.title')}</h2>
          <p>{t('terms.sections.acceptance.text')}</p>

          <h2 className="text-xl font-semibold mt-8">{t('terms.sections.services.title')}</h2>
          <p>{t('terms.sections.services.text')}</p>

          <h2 className="text-xl font-semibold mt-8">{t('terms.sections.registration.title')}</h2>
          <p>{t('terms.sections.registration.text')}</p>

          <h2 className="text-xl font-semibold mt-8">{t('terms.sections.intellectualProperty.title')}</h2>
          <p>{t('terms.sections.intellectualProperty.text')}</p>

          <h2 className="text-xl font-semibold mt-8">{t('terms.sections.liability.title')}</h2>
          <p>{t('terms.sections.liability.text')}</p>

          <h2 className="text-xl font-semibold mt-8">{t('terms.sections.changes.title')}</h2>
          <p>{t('terms.sections.changes.text')}</p>

          <h2 className="text-xl font-semibold mt-8">{t('terms.sections.law.title')}</h2>
          <p>{t('terms.sections.law.text')}</p>
        </div>
      </div>
    </Layout>
  );
}
