"use client";

import { TFunction } from "i18next";

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  nextStep: () => void;
  prevStep: () => void;
  t: TFunction;
}

export default function Step3Finance({ formData, handleChange, nextStep, prevStep, t }: Props) {
  return (
    <div className="form-step">
      <h2>{t("register.stepTitles.finance")}</h2>

      <div className="input-group">
        <label>{t("register.labels.income")}</label>
        <input type="number" name="rendaFamiliar" value={formData.rendaFamiliar} onChange={handleChange} required min="2000" />
      </div>

      <div className="input-group">
        <label>{t("register.labels.dependents")}</label>
        <input type="number" name="pessoasDependentes" value={formData.pessoasDependentes} onChange={handleChange} required min="0" />
      </div>

      <div className="form-actions">
        <button type="button" onClick={prevStep}>{t("register.buttons.back")}</button>
        <button type="button" onClick={nextStep}>{t("register.buttons.next")}</button>
      </div>
    </div>
  );
}
