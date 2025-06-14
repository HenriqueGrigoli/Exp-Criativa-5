"use client";

import { useState } from "react";
import { TFunction } from "i18next";

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleIdiomasChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  prevStep: () => void;
  t: TFunction;
}

export default function Step5Profile({
  formData,
  handleChange,
  handleIdiomasChange,
  prevStep,
  t,
}: Props) {
  const [errors, setErrors] = useState({
    motivacao: "",
    idiomasFalados: "",
  });

  const handleSubmitValidation = (e: React.FormEvent) => {
    let valid = true;
    const newErrors = { motivacao: "", idiomasFalados: "" };

    if (!formData.motivacao || formData.motivacao.trim().length < 30) {
      newErrors.motivacao = t("register.errors.minMotivation");
      valid = false;
    }

    if (!formData.idiomasFalados || formData.idiomasFalados.length === 0) {
      newErrors.idiomasFalados = t("register.errors.selectLanguage");
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      e.preventDefault();
    }
  };

  return (
    <div className="form-step">
      <h2>{t("register.stepTitles.profile")}</h2>

      <div className="input-group">
        <label>{t("register.labels.motivation")}*</label>
        <textarea
          name="motivacao"
          value={formData.motivacao}
          onChange={handleChange}
          required
          rows={6}
        />
        {errors.motivacao && (
          <p className="error-message">{errors.motivacao}</p>
        )}
      </div>

      <div className="input-group">
        <label>{t("register.labels.experience")}</label>
        <textarea
          name="experienciaPrevia"
          value={formData.experienciaPrevia}
          onChange={handleChange}
          rows={4}
        />
      </div>

<div className="input-group">
  <label>{t("register.labels.languages")}*</label>
  <div className="checkbox-grid">
    {[
      { value: "portugues", label: t("register.languages.portuguese") },
      { value: "ingles", label: t("register.languages.english") },
      { value: "espanhol", label: t("register.languages.spanish") },
      { value: "frances", label: t("register.languages.french") },
      { value: "arabe", label: t("register.languages.arabic") },
      { value: "outro", label: t("register.languages.other") },
    ].map((lang) => (
      <div key={lang.value} className="checkbox-item">
        <input
          type="checkbox"
          id={lang.value}
          value={lang.value}
          checked={formData.idiomasFalados.includes(lang.value)}
          onChange={(e) => {
            const checked = e.target.checked;
            const value = e.target.value;
            const updated = checked
              ? [...formData.idiomasFalados, value]
              : formData.idiomasFalados.filter((v: string) => v !== value);

            handleIdiomasChange({
              target: { selectedOptions: updated.map((v: any) => ({ value: v })) },
            } as any);
          }}
        />
        <label htmlFor={lang.value}>{lang.label}</label>
      </div>
    ))}
  </div>
  {errors.idiomasFalados && (
    <p className="error-message">{errors.idiomasFalados}</p>
  )}
</div>


      <div className="form-note">
        {/* <p>* {t("register.labels.requiredFields")}</p> */}
        <p>{t("register.labels.terms")}</p>
      </div>

      <div className="form-actions">
        <button type="button" onClick={prevStep}>
          {t("register.buttons.back")}
        </button>
        <button type="submit" onClick={handleSubmitValidation}>
          {t("register.buttons.submit")}
        </button>
      </div>
    </div>
  );
}
