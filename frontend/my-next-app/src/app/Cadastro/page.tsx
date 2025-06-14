"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./cadastro.css";
import Layout from "../Componentes/layout";
import { useTranslation } from "react-i18next";
import "../../i18n";

import Step1BasicInfo from "./Step1BasicInfo";
import Step2Residence from "./Step2Residence";
import Step3Finance from "./Step3Finance";
import Step4Documents from "./Step4Documents";
import Step5Profile from "./Step5Profile";

interface FormData {
  nomeCompleto: string;
  email: string;
  telefone: string;
  cpf: string;
  tipoMoradia: "própria" | "alugada" | "cedida";
  tempoResidencia: string;
  enderecoCompleto: string;
  quartosDisponiveis: number;
  banheiros: number;
  rendaFamiliar: string;
  pessoasDependentes: number;
  aceitaVisitas: boolean;
  disponibilidadeTreinamento: boolean;
  periodoMinimoAcolhimento: "6" | "12" | "18";
  antecedentesCriminais: File | null;
  motivacao: string;
  experienciaPrevia: string;
  idiomasFalados: string[];
}

export default function CadastroFamiliaAcolhedora() {
  const { t } = useTranslation();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<FormData>({
    nomeCompleto: "",
    email: "",
    telefone: "",
    cpf: "",
    tipoMoradia: "própria",
    tempoResidencia: "",
    enderecoCompleto: "",
    quartosDisponiveis: 1,
    banheiros: 1,
    rendaFamiliar: "",
    pessoasDependentes: 0,
    aceitaVisitas: false,
    disponibilidadeTreinamento: false,
    periodoMinimoAcolhimento: "6",
    antecedentesCriminais: null,
    motivacao: "",
    experienciaPrevia: "",
    idiomasFalados: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type } = e.target;

    setFormData((prev) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

      if (type === "checkbox") {
        return { ...prev, [name]: (target as HTMLInputElement).checked };
      }

      if (type === "file") {
        const file = (target as HTMLInputElement).files?.[0] ?? null;
        return { ...prev, [name]: file };
      }

      return { ...prev, [name]: target.value };
    });
  };

  const handleIdiomasChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map((option) => option.value);
    setFormData((prev) => ({ ...prev, idiomasFalados: selected }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const { antecedentesCriminais, ...usuarioData } = formData;

      const formDataToSend = new FormData();

      formDataToSend.append(
        "usuario",
        new Blob([JSON.stringify(usuarioData)], {
          type: "application/json",
        })
      );

      if (antecedentesCriminais) {
        formDataToSend.append("antecedentesCriminais", antecedentesCriminais);
      }


      const response = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || t("register.errors.default"));
      }

      setSuccess(t("register.success"));
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(t("register.errors.default"));
      }
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <Layout>
      <div className="cadastro-container">
        <div className="cadastro-header">
          <h1>{t("register.title")}</h1>
          <div className="progress-bar">
            {["step1", "step2", "step3", "step4", "step5"].map((key, index) => (
              <div
                key={key}
                className={`step ${step >= index + 1 ? "active" : ""}`}
              >
                {t(`register.steps.${key}`)}
              </div>
            ))}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <Step1BasicInfo
              formData={formData}
              handleChange={handleChange}
              nextStep={nextStep}
              t={t}
            />
          )}
          {step === 2 && (
            <Step2Residence
              formData={formData}
              handleChange={handleChange}
              nextStep={nextStep}
              prevStep={prevStep}
              t={t}
            />
          )}
          {step === 3 && (
            <Step3Finance
              formData={formData}
              handleChange={handleChange}
              nextStep={nextStep}
              prevStep={prevStep}
              t={t}
            />
          )}
          {step === 4 && (
            <Step4Documents
              formData={formData}
              handleChange={handleChange}
              nextStep={nextStep}
              prevStep={prevStep}
              t={t}
            />
          )}
          {step === 5 && (
            <Step5Profile
              formData={formData}
              handleChange={handleChange}
              handleIdiomasChange={handleIdiomasChange}
              prevStep={prevStep}
              t={t}
            />
          )}
        </form>
      </div>
    </Layout>
  );
}
