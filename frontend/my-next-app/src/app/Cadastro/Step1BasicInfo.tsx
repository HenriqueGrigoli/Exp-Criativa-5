"use client";

import { TFunction } from "i18next";
import { useState } from "react";

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  nextStep: () => void;
  t: TFunction;
}

export default function Step1BasicInfo({ formData, handleChange, nextStep, t }: Props) {
  const [errors, setErrors] = useState<{
    cpf?: string;
    email?: string;
    nomeCompleto?: string;
    telefone?: string;
  }>({});

  const validateCPF = (cpf: string) => {
    cpf = cpf.replace(/[^\d]/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstCheck = (sum * 10) % 11;
    if (firstCheck === 10) firstCheck = 0;
    if (firstCheck !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondCheck = (sum * 10) % 11;
    if (secondCheck === 10) secondCheck = 0;
    return secondCheck === parseInt(cpf.charAt(10));
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/[^\d]/g, "");
    return cleaned.length >= 10 && cleaned.length <= 11;
  };

  const handleNext = () => {
    const newErrors: {
      cpf?: string;
      email?: string;
      nomeCompleto?: string;
      telefone?: string;
    } = {};

    if (!formData.nomeCompleto.trim()) {
      newErrors.nomeCompleto = t("register.errors.required") || "Nome é obrigatório";
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = t("register.errors.required") || "Telefone é obrigatório";
    } else if (!validatePhone(formData.telefone)) {
      newErrors.telefone = t("register.errors.invalidPhone") || "Telefone inválido";
    }

    if (!validateCPF(formData.cpf)) {
      newErrors.cpf = t("register.errors.invalidCPF") || "CPF inválido";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = t("register.errors.invalidEmail") || "Email inválido";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      nextStep();
    }
  };

  return (
    <div className="form-step">
      <h2>{t("register.stepTitles.basicInfo")}</h2>

      <div className="input-group">
        <label>{t("register.labels.fullName")}*</label>
        <input
          type="text"
          name="nomeCompleto"
          value={formData.nomeCompleto}
          onChange={handleChange}
        />
        {errors.nomeCompleto && <p className="error-message">{errors.nomeCompleto}</p>}
      </div>

      <div className="input-group">
        <label>Email*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      <div className="input-group">
        <label>{t("register.labels.phone")}*</label>
        <input
          type="tel"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          placeholder="(DDD) 91234-5678"
        />
        {errors.telefone && <p className="error-message">{errors.telefone}</p>}
      </div>

      <div className="input-group">
        <label>CPF*</label>
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          placeholder="000.000.000-00"
        />
        {errors.cpf && <p className="error-message">{errors.cpf}</p>}
      </div>

      <div className="form-actions">
        <button type="button" onClick={handleNext}>
          {t("register.buttons.next")}
        </button>
      </div>
    </div>
  );
}
