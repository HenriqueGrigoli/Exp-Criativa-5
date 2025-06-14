"use client";

import { useState } from "react";
import { TFunction } from "i18next";

interface Props {
  formData: any;
  setFormData: (value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  t: TFunction;
}

export default function Step4Documents({
  formData,
  setFormData,
  nextStep,
  prevStep,
  t,
}: Props) {
  const [errors, setErrors] = useState({
    aceitaVisitas: "",
    disponibilidadeTreinamento: "",
    antecedentesCriminais: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setFormData({
        ...formData,
        antecedentesCriminais: [
          ...(formData.antecedentesCriminais || []),
          ...fileArray,
        ],
      });
      setErrors((prev) => ({ ...prev, antecedentesCriminais: "" }));
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...(formData.antecedentesCriminais || [])];
    updatedFiles.splice(index, 1);
    setFormData({
      ...formData,
      antecedentesCriminais: updatedFiles,
    });
  };

  const validate = () => {
    const newErrors = {
      aceitaVisitas: "",
      disponibilidadeTreinamento: "",
      antecedentesCriminais: "",
    };

    if (!formData.aceitaVisitas) {
      newErrors.aceitaVisitas = t("register.errors.required");
    }
    if (!formData.disponibilidadeTreinamento) {
      newErrors.disponibilidadeTreinamento = t("register.errors.required");
    }
    if (
      !formData.antecedentesCriminais ||
      formData.antecedentesCriminais.length === 0
    ) {
      newErrors.antecedentesCriminais = t("register.errors.requiredFile");
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  return (
    <div className="form-step">
      <h2 className="font-bold">{t("register.stepTitles.documents")}*</h2>

      <div className="input-group checkbox-group">
        <input
          type="checkbox"
          name="aceitaVisitas"
          checked={formData.aceitaVisitas}
          onChange={(e) => {
            setFormData({ ...formData, aceitaVisitas: e.target.checked });
            if (e.target.checked) {
              setErrors((prev) => ({ ...prev, aceitaVisitas: "" }));
            }
          }}
        />
        <label>{t("register.labels.visits")}</label>
      </div>
      {errors.aceitaVisitas && (
        <p className="error-message">{errors.aceitaVisitas}</p>
      )}

      <div className="input-group checkbox-group">
        <input
          type="checkbox"
          name="disponibilidadeTreinamento"
          checked={formData.disponibilidadeTreinamento}
          onChange={(e) => {
            setFormData({
              ...formData,
              disponibilidadeTreinamento: e.target.checked,
            });
            if (e.target.checked) {
              setErrors((prev) => ({ ...prev, disponibilidadeTreinamento: "" }));
            }
          }}
        />
        <label>{t("register.labels.training")}</label>
      </div>
      {errors.disponibilidadeTreinamento && (
        <p className="error-message">{errors.disponibilidadeTreinamento}</p>
      )}


      <div className="input-group">
        <label>{t("register.labels.period")}</label>
        <select
          name="periodoMinimoAcolhimento"
          value={formData.periodoMinimoAcolhimento}
          onChange={(e) =>
            setFormData({ ...formData, periodoMinimoAcolhimento: e.target.value })
          }
          required
        >
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="18">18</option>
        </select>
      </div>

      {/* Upload de Arquivos */}
      <div className="input-group">
        <label className="font-semibold">
          {t("register.labels.criminalRecord")}*
        </label>
        <input
          id="antecedentesCriminais"
          type="file"
          multiple
          onChange={handleFileChange}
          accept=".pdf,.jpg,.png"
          style={{ display: "none" }}
        />
        <label htmlFor="antecedentesCriminais" className="btn-upload">
          {t("register.buttons.addFile")}
        </label>

        {formData.antecedentesCriminais?.length > 0 && (
          <ul className="file-list">
            {formData.antecedentesCriminais.map(
              (file: File, index: number) => (
                <li key={index} className="file-item">
                  <span className="file-name">{file.name}</span>
                  <button
                    type="button"
                    className="remove-file"
                    onClick={() => handleRemoveFile(index)}
                  >
                    {t("register.buttons.remove")}
                  </button>
                </li>
              )
            )}
          </ul>
        )}
        {errors.antecedentesCriminais && (
          <p className="error-message">{errors.antecedentesCriminais}</p>
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
