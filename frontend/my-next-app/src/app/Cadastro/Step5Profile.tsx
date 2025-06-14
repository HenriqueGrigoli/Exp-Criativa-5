"use client";

import { TFunction } from "i18next";

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleIdiomasChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  prevStep: () => void;
  t: TFunction;
}

export default function Step5Profile({ formData, handleChange, handleIdiomasChange, prevStep, t }: Props) {
  return (
    <div className="form-step">
      <h2>{t("register.stepTitles.profile")}</h2>

      <div className="input-group">
        <label>{t("register.labels.motivation")}</label>
        <textarea name="motivacao" value={formData.motivacao} onChange={handleChange} required rows={4} />
      </div>

      <div className="input-group">
        <label>{t("register.labels.experience")}</label>
        <textarea name="experienciaPrevia" value={formData.experienciaPrevia} onChange={handleChange} rows={4} />
      </div>

      <div className="input-group">
        <label>{t("register.labels.languages")}</label>
        <select name="idiomasFalados" multiple value={formData.idiomasFalados} onChange={handleIdiomasChange}>
          <option value="portugues">{t("register.languages.portuguese")}</option>
          <option value="ingles">{t("register.languages.english")}</option>
          <option value="espanhol">{t("register.languages.spanish")}</option>
          <option value="frances">{t("register.languages.french")}</option>
          <option value="arabe">{t("register.languages.arabic")}</option>
          <option value="outro">{t("register.languages.other")}</option>
        </select>
      </div>

      <div className="form-note">
        <p>* {t("register.labels.requiredFields")}</p>
        <p>{t("register.labels.terms")}</p>
      </div>

      <div className="form-actions">
        <button type="button" onClick={prevStep}>{t("register.buttons.back")}</button>
        <button type="submit">{t("register.buttons.submit")}</button>
      </div>
    </div>
  );
}
