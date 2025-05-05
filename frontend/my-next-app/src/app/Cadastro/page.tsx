"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./cadastro.css";
import Layout from "../Componentes/layout"

interface FormData {
  // Informações básicas
  nomeCompleto: string;
  email: string;
  telefone: string;
  cpf: string;

  // Informações residenciais
  tipoMoradia: "própria" | "alugada" | "cedida";
  tempoResidencia: string;
  enderecoCompleto: string;
  quartosDisponiveis: number;
  banheiros: number;

  // Situação financeira
  rendaFamiliar: string;
  pessoasDependentes: number;

  // Documentação e compromisso
  aceitaVisitas: boolean;
  disponibilidadeTreinamento: boolean;
  periodoMinimoAcolhimento: "6" | "12" | "18";
  antecedentesCriminais: File | null;

  // Motivação e perfil
  motivacao: string;
  experienciaPrevia: string;
  idiomasFalados: string[];
}

export default function CadastroFamiliaAcolhedora() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<FormData>({
    nomeCompleto: "",
    email: "",
    telefone: "",
    cpf: "",
    tipoMoradia: "própria",
    tempoResidencia: "",
    enderecoCompleto: "",
    quartosDisponiveis: 1,
    banheiros: 1,
    rendaFamiliar: "",
    pessoasDependentes: 0,
    aceitaVisitas: false,
    disponibilidadeTreinamento: false,
    periodoMinimoAcolhimento: "6",
    antecedentesCriminais: null,
    motivacao: "",
    experienciaPrevia: "",
    idiomasFalados: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type } = e.target;

    setFormData(prev => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

      if (type === 'checkbox') {
        const inputTarget = e.target as HTMLInputElement;
        return { ...prev, [name]: inputTarget.checked };
      }

      if (type === 'file') {
        const inputTarget = e.target as HTMLInputElement;
        return { ...prev, [name]: inputTarget.files ? inputTarget.files[0] : null };
      }

      return { ...prev, [name]: target.value };
    });
  };

  const handleIdiomasChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const value: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setFormData(prev => ({ ...prev, idiomasFalados: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const formDataToSend = new FormData();

      const usuarioData = {
        nomeCompleto: formData.nomeCompleto,
        email: formData.email,
        telefone: formData.telefone,
        cpf: formData.cpf,
        tipoMoradia: formData.tipoMoradia,
        tempoResidencia: formData.tempoResidencia,
        enderecoCompleto: formData.enderecoCompleto,
        quartosDisponiveis: formData.quartosDisponiveis,
        banheiros: formData.banheiros,
        rendaFamiliar: formData.rendaFamiliar,
        pessoasDependentes: formData.pessoasDependentes,
        aceitaVisitas: formData.aceitaVisitas,
        disponibilidadeTreinamento: formData.disponibilidadeTreinamento,
        periodoMinimoAcolhimento: formData.periodoMinimoAcolhimento,
        motivacao: formData.motivacao,
        experienciaPrevia: formData.experienciaPrevia,
        idiomasFalados: formData.idiomasFalados
      };

      formDataToSend.append('usuario', new Blob([JSON.stringify(usuarioData)], {
        type: 'application/json'
      }));

      if (formData.antecedentesCriminais) {
        formDataToSend.append('antecedentesCriminais', formData.antecedentesCriminais);
      }

      const response = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro no cadastro');
      }

      setSuccess("Cadastro realizado com sucesso! Entraremos em contato em breve.");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ocorreu um erro durante o cadastro.");
      }
      console.error("Erro detalhado:", error);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <Layout>
      <div className="cadastro-container">
        <div className="cadastro-header">
          <h1>Cadastro de Família Acolhedora</h1>
          <div className="progress-bar">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Dados Pessoais</div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Residência</div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Financeiro</div>
            <div className={`step ${step >= 4 ? 'active' : ''}`}>4. Documentos</div>
            <div className={`step ${step >= 5 ? 'active' : ''}`}>5. Perfil</div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          {/* Passo 1: Dados Pessoais */}
          {step === 1 && (
            <div className="form-step">
              <h2>Informações Básicas</h2>
              <div className="input-group">
                <label>Nome Completo*</label>
                <input
                  type="text"
                  name="nomeCompleto"
                  value={formData.nomeCompleto}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>E-mail*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Telefone*</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>CPF*</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={nextStep}>Próximo</button>
              </div>
            </div>
          )}

          {/* Passo 2: Informações Residenciais */}
          {step === 2 && (
            <div className="form-step">
              <h2>Informações Residenciais</h2>

              <div className="input-group">
                <label>Tipo de Moradia*</label>
                <select
                  name="tipoMoradia"
                  value={formData.tipoMoradia}
                  onChange={handleChange}
                  required
                >
                  <option value="própria">Própria</option>
                  <option value="alugada">Alugada</option>
                  <option value="cedida">Cedida</option>
                </select>
              </div>

              <div className="input-group">
                <label>Tempo na Residência (meses)*</label>
                <input
                  type="number"
                  name="tempoResidencia"
                  value={formData.tempoResidencia}
                  onChange={handleChange}
                  required
                  min="6"
                />
              </div>

              <div className="input-group">
                <label>Endereço Completo*</label>
                <input
                  type="text"
                  name="enderecoCompleto"
                  value={formData.enderecoCompleto}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Quartos Disponíveis*</label>
                <input
                  type="number"
                  name="quartosDisponiveis"
                  value={formData.quartosDisponiveis}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>

              <div className="input-group">
                <label>Banheiros*</label>
                <input
                  type="number"
                  name="banheiros"
                  value={formData.banheiros}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={prevStep}>Voltar</button>
                <button type="button" onClick={nextStep}>Próximo</button>
              </div>
            </div>
          )}

          {/* Passo 3: Situação Financeira */}
          {step === 3 && (
            <div className="form-step">
              <h2>Situação Financeira</h2>

              <div className="input-group">
                <label>Renda Familiar Mensal (R$)*</label>
                <input
                  type="number"
                  name="rendaFamiliar"
                  value={formData.rendaFamiliar}
                  onChange={handleChange}
                  required
                  min="2000"
                />
              </div>

              <div className="input-group">
                <label>Pessoas Dependentes*</label>
                <input
                  type="number"
                  name="pessoasDependentes"
                  value={formData.pessoasDependentes}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={prevStep}>Voltar</button>
                <button type="button" onClick={nextStep}>Próximo</button>
              </div>
            </div>
          )}

          {/* Passo 4: Documentação e Compromisso */}
          {step === 4 && (
            <div className="form-step">
              <h2>Documentação e Compromisso</h2>

              <div className="input-group checkbox-group">
                <input
                  type="checkbox"
                  name="aceitaVisitas"
                  checked={formData.aceitaVisitas}
                  onChange={handleChange}
                  required
                />
                <label>Concordo com visitas domiciliares periódicas*</label>
              </div>

              <div className="input-group checkbox-group">
                <input
                  type="checkbox"
                  name="disponibilidadeTreinamento"
                  checked={formData.disponibilidadeTreinamento}
                  onChange={handleChange}
                  required
                />
                <label>Tenho disponibilidade para participar do treinamento obrigatório*</label>
              </div>

              <div className="input-group">
                <label>Período mínimo de acolhimento (meses)*</label>
                <select
                  name="periodoMinimoAcolhimento"
                  value={formData.periodoMinimoAcolhimento}
                  onChange={handleChange}
                  required
                >
                  <option value="6">6 meses</option>
                  <option value="12">12 meses</option>
                  <option value="18">18 meses</option>
                </select>
              </div>

              <div className="input-group">
                {/* input oculto */}
                <input
                  id="antecedentesCriminais"
                  type="file"
                  name="antecedentesCriminais"
                  onChange={handleChange}
                  required
                  accept=".pdf,.jpg,.png"
                  style={{ display: "none" }}
                />

                {/* label estilizado como botão */}
                <label
                  htmlFor="antecedentesCriminais"
                  className="btn-upload"
                  style={{
                    backgroundColor: "#004080",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: 600,
                    display: "inline-block"
                  }}
                >
                  Atestado de Antecedentes Criminais*
                </label>

                {/* exibe o nome do arquivo após seleção */}
                {formData.antecedentesCriminais && (
                  <span
                    className="file-name"
                    style={{ marginLeft: "12px", fontWeight: 500, color: "#333" }}
                  >
                    {formData.antecedentesCriminais.name}
                  </span>
                )}
              </div>

              <div className="form-actions">
                <button type="button" onClick={prevStep}>Voltar</button>
                <button type="button" onClick={nextStep}>Próximo</button>
              </div>
            </div>
          )}

          {/* Passo 5: Motivação e Perfil */}
          {step === 5 && (
            <div className="form-step">
              <h2>Motivação e Perfil</h2>

              <div className="input-group">
                <label>Motivação para ser família acolhedora*</label>
                <textarea
                  name="motivacao"
                  value={formData.motivacao}
                  onChange={handleChange}
                  required
                  rows="4"
                />
              </div>

              <div className="input-group">
                <label>Experiência prévia com refugiados ou imigrantes</label>
                <textarea
                  name="experienciaPrevia"
                  value={formData.experienciaPrevia}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

              <div className="input-group">
                <label>Idiomas falados (selecione todos que aplicar)</label>
                <select
                  name="idiomasFalados"
                  multiple
                  value={formData.idiomasFalados}
                  onChange={handleIdiomasChange}
                >
                  <option value="portugues">Português</option>
                  <option value="ingles">Inglês</option>
                  <option value="espanhol">Espanhol</option>
                  <option value="frances">Francês</option>
                  <option value="arabe">Árabe</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div className="form-note">
                <p>* Campos obrigatórios</p>
                <p>Ao enviar este formulário, você concorda com nossos Termos de Uso e Política de Privacidade.</p>
              </div>

              <div className="form-actions">
                <button type="button" onClick={prevStep}>Voltar</button>
                <button type="submit">Enviar Cadastro</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
}