"use client";
import React, { useEffect, useState } from "react";
import Layout from "../Componentes/layout";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const faqs = [
    {
      question: "Quem pode ajudar?",
      answer:
        "Qualquer pessoa disposta a doar, acolher ou oferecer apoio voluntário pode se cadastrar e ajudar os refugiados.",
    },
    {
      question: "Como funciona o processo de abrigo?",
      answer:
        "Após se cadastrar como abrigo, nossa equipe entra em contato para realizar uma entrevista e orientar sobre o processo de acolhimento.",
    },
    {
      question: "Para onde vão as doações?",
      answer:
        "Todas as doações são destinadas às famílias refugiadas cadastradas e são distribuídas conforme a urgência e necessidade.",
    },
    {
      question: "Como me torno voluntário?",
      answer:
        "Basta acessar a página de cadastro, selecionar 'Voluntário' e preencher o formulário. Entraremos em contato com mais informações.",
    },
    {
      question: "Posso doar itens físicos como roupas ou alimentos?",
      answer:
        "Sim. Temos pontos de coleta parceiros e também recebemos em eventos específicos organizados pela ONG.",
    },
    {
      question: "A IRIS atua em todo o Brasil?",
      answer:
        "Atualmente, estamos concentrados nas capitais e grandes centros urbanos, mas temos planos de expansão em parceria com outras organizações.",
    },
    {
      question: "Há algum custo para ser voluntário?",
      answer:
        "Não. Ser voluntário na IRIS é totalmente gratuito, e oferecemos orientação e suporte durante todo o processo.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      <div className="font-sans text-gray-800 leading-relaxed bg-white min-h-screen py-16 px-5">
        <h1 className="text-5xl font-bold text-blue-700 mb-10 text-center uppercase">
          PERGUNTAS FREQUENTES
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
