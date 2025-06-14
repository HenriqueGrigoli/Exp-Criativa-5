"use client";

import { TFunction } from "i18next";
import { useState } from "react";

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  nextStep: () => void;
  prevStep: () => void;
  t: TFunction;
}

export default function Step3Finance({
  formData,
  handleChange,
  nextStep,
  prevStep,
  t,
}: Props) {
  const [errors, setErrors] = useState<{ renda?: string; dependentes?: string }>({});

  const formatCurrency = (value: string) => {
    const numeric = value.replace(/\D/g, "");
    const float = (parseFloat(numeric) / 100).toFixed(2);
    const formatted = float
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formatted;
  };

  const handleRendaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    handleChange({
      target: { name: "rendaFamiliar", value: formatted },
    } as any);
  };

  const validate = () => {
    const errors: { renda?: string; dependentes?: string } = {};

    if (!formData.rendaFamiliar) {
      errors.renda = t("register.errors.required");
    } else if (!/^\d{1,3}(\.\d{3})*,\d{2}$/.test(formData.rendaFamiliar)) {
      errors.renda = t("register.errors.invalidCurrency");
    }

    if (formData.pessoasDependentes === "" || formData.pessoasDependentes < 1) {
      errors.dependentes = t("register.errors.invalidDependents");
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  return (
    <div className="form-step">
      <h2>{t("register.stepTitles.financial")}</h2>

      <div className="input-group">
        <label>
          {t("register.labels.income")}*
        </label>
        <input
          type="text"
          name="rendaFamiliar"
          value={formData.rendaFamiliar}
          onChange={handleRendaChange}
          required
          placeholder="0,00"
        />
        {errors.renda && <p className="error-message">{errors.renda}</p>}
      </div>

      <div className="input-group">
        <label>
          {t("register.labels.dependents")}*
        </label>
        <input
          type="number"
          name="pessoasDependentes"
          value={formData.pessoasDependentes}
          onChange={handleChange}
          required
          min={0}
        />
        {errors.dependentes && (
          <p className="error-message">{errors.dependentes}</p>
        )}
      </div>

      <div className="form-actions">
        <button type="button" onClick={prevStep}>
          {t("register.buttons.back")}
        </button>
        <button type="button" onClick={handleNext}>
          {t("register.buttons.next")}
        </button>
      </div>
    </div>
  );
}
