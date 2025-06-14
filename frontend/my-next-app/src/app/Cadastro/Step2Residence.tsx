"use client";

import { useState } from "react";
import { TFunction } from "i18next";

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  nextStep: () => void;
  prevStep: () => void;
  t: TFunction;
}

export default function Step2Residence({
  formData,
  handleChange,
  nextStep,
  prevStep,
  t,
}: Props) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.tipoMoradia) {
      newErrors.tipoMoradia = t("register.errors.required");
    }
    if (!formData.tempoResidencia) {
      newErrors.tempoResidencia = t("register.errors.required");
    }
    if (!formData.enderecoCompleto) {
      newErrors.enderecoCompleto = t("register.errors.required");
    }
    if (!formData.quartosDisponiveis) {
      newErrors.quartosDisponiveis = t("register.errors.required");
    }
    if (!formData.banheiros) {
      newErrors.banheiros = t("register.errors.required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  return (
    <div className="form-step">
      <h2>{t("register.stepTitles.residence")}</h2>

      <div className="input-group">
        <label>
          {t("register.labels.housingType")}*
        </label>
        <select
          name="tipoMoradia"
          value={formData.tipoMoradia}
          onChange={handleChange}
        >
          <option value="">{t("register.labels.selectOption")}</option>
          <option value="própria">{t("register.options.own")}</option>
          <option value="alugada">{t("register.options.rented")}</option>
          <option value="cedida">{t("register.options.granted")}</option>
        </select>
        {errors.tipoMoradia && <p className="error-message">{errors.tipoMoradia}</p>}
      </div>

      <div className="input-group">
        <label>
          {t("register.labels.residenceTime")}*
        </label>
        <input
          type="number"
          name="tempoResidencia"
          value={formData.tempoResidencia}
          onChange={handleChange}
          min="6"
        />
        {errors.tempoResidencia && <p className="error-message">{errors.tempoResidencia}</p>}
      </div>

      <div className="input-group">
        <label>
          {t("register.labels.address")}*
        </label>
        <input
          type="text"
          name="enderecoCompleto"
          value={formData.enderecoCompleto}
          onChange={handleChange}
        />
        {errors.enderecoCompleto && <p className="error-message">{errors.enderecoCompleto}</p>}
      </div>

      <div className="input-group">
        <label>
          {t("register.labels.rooms")}*
        </label>
        <input
          type="number"
          name="quartosDisponiveis"
          value={formData.quartosDisponiveis}
          onChange={handleChange}
          min="1"
        />
        {errors.quartosDisponiveis && <p className="error-message">{errors.quartosDisponiveis}</p>}
      </div>

      <div className="input-group">
        <label>
          {t("register.labels.bathrooms")}*
        </label>
        <input
          type="number"
          name="banheiros"
          value={formData.banheiros}
          onChange={handleChange}
          min="1"
        />
        {errors.banheiros && <p className="error-message">{errors.banheiros}</p>}
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
