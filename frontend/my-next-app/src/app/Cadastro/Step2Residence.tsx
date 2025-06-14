"use client";

import { TFunction } from "i18next";

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  nextStep: () => void;
  prevStep: () => void;
  t: TFunction;
}

export default function Step2Residence({ formData, handleChange, nextStep, prevStep, t }: Props) {
  return (
    <div className="form-step">
      <h2>{t("register.stepTitles.residence")}</h2>

      <div className="input-group">
        <label>{t("register.labels.housingType")}</label>
        <select name="tipoMoradia" value={formData.tipoMoradia} onChange={handleChange} required>
          <option value="própria">{t("register.options.own")}</option>
          <option value="alugada">{t("register.options.rented")}</option>
          <option value="cedida">{t("register.options.granted")}</option>
        </select>
      </div>

      <div className="input-group">
        <label>{t("register.labels.residenceTime")}</label>
        <input type="number" name="tempoResidencia" value={formData.tempoResidencia} onChange={handleChange} required min="6" />
      </div>

      <div className="input-group">
        <label>{t("register.labels.address")}</label>
        <input type="text" name="enderecoCompleto" value={formData.enderecoCompleto} onChange={handleChange} required />
      </div>

      <div className="input-group">
        <label>{t("register.labels.rooms")}</label>
        <input type="number" name="quartosDisponiveis" value={formData.quartosDisponiveis} onChange={handleChange} required min="1" />
      </div>

      <div className="input-group">
        <label>{t("register.labels.bathrooms")}</label>
        <input type="number" name="banheiros" value={formData.banheiros} onChange={handleChange} required min="1" />
      </div>

      <div className="form-actions">
        <button type="button" onClick={prevStep}>{t("register.buttons.back")}</button>
        <button type="button" onClick={nextStep}>{t("register.buttons.next")}</button>
      </div>
    </div>
  );
}
