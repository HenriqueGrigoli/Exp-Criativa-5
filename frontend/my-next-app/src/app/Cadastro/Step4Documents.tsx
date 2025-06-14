"use client";

import { TFunction } from "i18next";

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  nextStep: () => void;
  prevStep: () => void;
  t: TFunction;
}

export default function Step4Documents({ formData, handleChange, nextStep, prevStep, t }: Props) {
  return (
    <div className="form-step">
      <h2>{t("register.stepTitles.documents")}</h2>

      <div className="input-group checkbox-group">
        <input type="checkbox" name="aceitaVisitas" checked={formData.aceitaVisitas} onChange={handleChange} required />
        <label>{t("register.labels.visits")}</label>
      </div>

      <div className="input-group checkbox-group">
        <input type="checkbox" name="disponibilidadeTreinamento" checked={formData.disponibilidadeTreinamento} onChange={handleChange} required />
        <label>{t("register.labels.training")}</label>
      </div>

      <div className="input-group">
        <label>{t("register.labels.period")}</label>
        <select name="periodoMinimoAcolhimento" value={formData.periodoMinimoAcolhimento} onChange={handleChange} required>
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="18">18</option>
        </select>
      </div>

      <div className="input-group">
        <input id="antecedentesCriminais" type="file" name="antecedentesCriminais" onChange={handleChange} required accept=".pdf,.jpg,.png" style={{ display: "none" }} />
        <label htmlFor="antecedentesCriminais" className="btn-upload">
          {t("register.labels.criminalRecord")}
        </label>
        {formData.antecedentesCriminais && (
          <span className="file-name">{formData.antecedentesCriminais.name}</span>
        )}
      </div>

      <div className="form-actions">
        <button type="button" onClick={prevStep}>{t("register.buttons.back")}</button>
        <button type="button" onClick={nextStep}>{t("register.buttons.next")}</button>
      </div>
    </div>
  );
}
