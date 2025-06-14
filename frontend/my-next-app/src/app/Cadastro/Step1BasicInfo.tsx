"use client";

import { TFunction } from "i18next";

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  nextStep: () => void;
  t: TFunction;
}

export default function Step1BasicInfo({ formData, handleChange, nextStep, t }: Props) {
  return (
    <div className="form-step">
      <h2>{t("register.stepTitles.basicInfo")}</h2>

      <div className="input-group">
        <label>{t("register.labels.fullName")}</label>
        <input type="text" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} required />
      </div>

      <div className="input-group">
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="input-group">
        <label>{t("register.labels.phone")}</label>
        <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} required />
      </div>

      <div className="input-group">
        <label>CPF</label>
        <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required />
      </div>

      <div className="form-actions">
        <button type="button" onClick={nextStep}>{t("register.buttons.next")}</button>
      </div>
    </div>
  );
}
