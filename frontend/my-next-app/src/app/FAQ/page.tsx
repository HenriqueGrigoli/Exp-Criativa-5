'use client';

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import '../../i18n';
import Layout from "../Componentes/layout";

export default function Faq() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const faqs = t('faq.items', { returnObjects: true }) as Array<{ question: string; answer: string }>;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      <div className="font-sans text-gray-800 leading-relaxed bg-white min-h-screen py-16 px-5">
        <h1 className="text-5xl font-bold text-blue-700 mb-10 text-center uppercase">
          {t('faq.title')}
        </h1>
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-5 bg-white cursor-pointer shadow-sm transition"
              onClick={() => toggleFAQ(index)}
            >
              <h2 className="text-2xl font-bold text-blue-600 flex justify-between items-center">
                {faq.question}
                <span className="ml-4 text-2xl select-none">
                  {openIndex === index ? "−" : "+"}
                </span>
              </h2>
              {openIndex === index && (
                <p className="mt-3 text-lg text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
