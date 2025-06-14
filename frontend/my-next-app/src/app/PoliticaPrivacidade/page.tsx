'use client';

import Layout from "../Componentes/layout";
import { useTranslation } from "react-i18next";
import '../../i18n';

export default function PoliticaPrivacidade() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="bg-white">
        <div className="py-20 px-8 max-w-5xl mx-auto text-gray-800 space-y-6">
          <h1 className="text-3xl font-bold text-blue-700">{t('privacy.title')}</h1>

          <p>{t('privacy.intro')}</p>

          <h2 className="text-xl font-semibold mt-8">{t('privacy.sections.dataCollection.title')}</h2>
          <p>{t('privacy.sections.dataCollection.text')}</p>

          <h2 className="text-xl font-semibold mt-8">{t('privacy.sections.purpose.title')}</h2>
          <p>{t('privacy.sections.purpose.text')}</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>{t('privacy.sections.purpose.items.processDonations')}</li>
            <li>{t('privacy.sections.purpose.items.socialScreening')}</li>
            <li>{t('privacy.sections.purpose.items.communication')}</li>
            <li>{t('privacy.sections.purpose.items.improveExperience')}</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8">{t('privacy.sections.consent.title')}</h2>
          <p>{t('privacy.sections.consent.text')}</p>

          <h2 className="text-xl font-semibold mt-8">{t('privacy.sections.sharing.title')}</h2>
          <p>{t('privacy.sections.sharing.text')}</p>

          <h2 className="text-xl font-semibold mt-8">{t('privacy.sections.security.title')}</h2>
          <p>{t('privacy.sections.security.text')}</p>

          <h2 className="text-xl font-semibold mt-8">{t('privacy.sections.retention.title')}</h2>
          <p>{t('privacy.sections.retention.text')}</p>

          <h2 className="text-xl font-semibold mt-8">{t('privacy.sections.rights.title')}</h2>
          <p>{t('privacy.sections.rights.text')}</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>{t('privacy.sections.rights.items.access')}</li>
            <li>{t('privacy.sections.rights.items.correction')}</li>
            <li>{t('privacy.sections.rights.items.revocation')}</li>
            <li>{t('privacy.sections.rights.items.deletion')}</li>
          </ul>
          <p>
            {t('privacy.sections.rights.contact')} <strong>contato@iris.org.br</strong>.
          </p>

          <h2 className="text-xl font-semibold mt-8">{t('privacy.sections.cookies.title')}</h2>
          <p>{t('privacy.sections.cookies.text')}</p>

          <h2 className="text-xl font-semibold mt-8">{t('privacy.sections.updates.title')}</h2>
          <p>{t('privacy.sections.updates.text')}</p>
        </div>
      </div>
    </Layout>
  );
}
