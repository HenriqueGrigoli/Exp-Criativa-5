"use client";

import { useState } from "react";

type NovoCadastroProps = {
  onSuccess: () => void;
};

export default function NovoCadastroImigrante({ onSuccess }: NovoCadastroProps) {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState("");
  const [paisOrigem, setPaisOrigem] = useState("");
  const [possuiDocumento, setPossuiDocumento] = useState(false);
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [documentoFile, setDocumentoFile] = useState<File | null>(null);
  const [dataChegada, setDataChegada] = useState("");
  const [situacaoMigratoria, setSituacaoMigratoria] = useState("");
  const [familiaId, setFamiliaId] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [condicoesMedicas, setCondicoesMedicas] = useState("");
  const [alergias, setAlergias] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    const imigranteData = {
      nomeCompleto,
      dataNascimento,
      genero,
      paisOrigem,
      possuiDocumento,
      tipoDocumento,
      numeroDocumento,
      dataChegada,
      situacaoMigratoria,
      familiaId,
      contato: { telefone, email, endereco },
      saude: {
        condicoesMedicas: condicoesMedicas.split(",").map((i) => i.trim()),
        alergias: alergias.split(",").map((i) => i.trim()),
      },
    };

    formData.append("imigrante", JSON.stringify(imigranteData));
    if (documentoFile) formData.append("documento", documentoFile);

    try {
      const response = await fetch("http://localhost:8080/api/imigrantes", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Refugiado cadastrado com sucesso!");
        onSuccess();
        limparCampos();
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro na conexão com o servidor");
    }
  };


    const limparCampos = () => {
    setNomeCompleto("");
    setDataNascimento("");
    setGenero("");
    setPaisOrigem("");
    setPossuiDocumento(false);
    setTipoDocumento("");
    setNumeroDocumento("");
    setDocumentoFile(null);
    setDataChegada("");
    setSituacaoMigratoria("");
    setFamiliaId("");
    setTelefone("");
    setEmail("");
    setEndereco("");
    setCondicoesMedicas("");
    setAlergias("");
  };

  return (
    <div className="max-w-4xl mt-12 bg-white p-6 rounded-lg shadow-md mr-auto">
      <h2 className="text-2xl font-bold text-black mb-6">Cadastro de Refugiado/Imigrante</h2>

      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        {/* Dados Pessoais */}
        <div className="space-y-4 w-full">
          <h3 className="text-lg font-semibold text-black border-b pb-2">Dados Pessoais</h3>

          <div className="flex flex-col space-y-4 w-full">
            <div className="w-full">
              <label className="block text-sm font-medium text-black">Nome Completo*</label>
              <input
                type="text"
                value={nomeCompleto}
                onChange={(e) => setNomeCompleto(e.target.value)}
                className="mt-1 block w-full border border-black rounded-md p-2 text-black placeholder-gray-400"
                required
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-black">Data de Nascimento*</label>
              <input
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                className="mt-1 block w-full border border-black rounded-md p-2 text-black placeholder-gray-400"
                required
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-black">Gênero*</label>
              <select
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                className="mt-1 block w-full border border-black rounded-md p-2 text-black"
                required
              >
                <option className="text-black" value="">
                  Selecione
                </option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMININO">Feminino</option>
                <option value="OUTRO">Outro</option>
                <option value="PREFIRO_NAO_DIZER">Prefiro não dizer</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-black">País de Origem*</label>
              <input
                type="text"
                value={paisOrigem}
                onChange={(e) => setPaisOrigem(e.target.value)}
                className="mt-1 block w-full border border-black rounded-md p-2 text-black placeholder-gray-400"
                required
              />
            </div>
          </div>
        </div>

        {/* Documentação */}
        <div className="space-y-4 w-full">
          <h3 className="text-lg font-semibold text-black border-b pb-2">Documentação</h3>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="possuiDocumento"
              checked={possuiDocumento}
              onChange={(e) => setPossuiDocumento(e.target.checked)}
              className="h-4 w-4 text-black focus:ring-black border-black rounded"
            />
            <label htmlFor="possuiDocumento" className="ml-2 block text-sm text-black">
              Possui documento de identificação?
            </label>
          </div>

          {possuiDocumento && (
            <div className="space-y-4 w-full">
              <div className="w-full">
                <label className="block text-sm font-medium text-black">Tipo de Documento</label>
                <select
                  value={tipoDocumento}
                  onChange={(e) => setTipoDocumento(e.target.value)}
                  className="mt-1 block w-full border border-black rounded-md p-2 text-black"
                >
                  <option className="text-black" value="">
                    Selecione
                  </option>
                  <option value="PASSAPORTE">Passaporte</option>
                  <option value="RG">RG</option>
                  <option value="CERTIDAO_NASCIMENTO">Certidão de Nascimento</option>
                  <option value="OUTRO">Outro</option>
                </select>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-black">Número do Documento</label>
                <input
                  type="text"
                  value={numeroDocumento}
                  onChange={(e) => setNumeroDocumento(e.target.value)}
                  className="mt-1 block w-full border border-black rounded-md p-2 text-black placeholder-gray-400"
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-black">
                  Anexar Cópia do Documento (opcional)
                </label>
                <input
                  type="file"
                  onChange={(e) => setDocumentoFile(e.target.files?.[0] || null)}
                  className="mt-1 block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>
            </div>
          )}
        </div>

        {/* Situação Migratória */}
        <div className="space-y-4 w-full">
          <h3 className="text-lg font-semibold text-black border-b pb-2">Situação Migratória</h3>

          <div className="space-y-4 w-full">
            <div className="w-full">
              <label className="block text-sm font-medium text-black">Data de Chegada*</label>
              <input
                type="date"
                value={dataChegada}
                onChange={(e) => setDataChegada(e.target.value)}
                className="mt-1 block w-full border border-black rounded-md p-2 text-black placeholder-gray-400"
                required
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-black">Situação Migratória*</label>
              <select
                value={situacaoMigratoria}
                onChange={(e) => setSituacaoMigratoria(e.target.value)}
                className="mt-1 block w-full border border-black rounded-md p-2 text-black"
                required
              >
                <option className="text-black" value="">
                  Selecione
                </option>
                <option value="REFUGIADO">Refugiado</option>
                <option value="SOLICITANTE_REFUGIO">Solicitante de Refúgio</option>
                <option value="MIGRANTE">Migrante</option>
                <option value="APATRIDA">Apátrida</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-black">ID da Família (se aplicável)</label>
              <input
                type="text"
                value={familiaId}
                onChange={(e) => setFamiliaId(e.target.value)}
                className="mt-1 block w-full border border-black rounded-md p-2 text-black placeholder-gray-400"
                placeholder="Deixe em branco se não se aplica"
              />
            </div>
          </div>
        </div>

        {/* Contato */}
        <div className="space-y-4 w-full">
          <h3 className="text-lg font-semibold text-black border-b pb-2">Informações de Contato</h3>

          <div className="space-y-4 w-full">
            <div className="w-full">
              <label className="block text-sm font-medium text-black">Telefone</label>
              <input
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="mt-1 block w-full border border-black rounded-md p-2 text-black placeholder-gray-400"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-black">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-black rounded-md p-2 text-black placeholder-gray-400"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-black">Endereço Atual</label>
              <input
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="mt-1 block w-full border border-black rounded-md p-2 text-black placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Saúde */}
        <div className="space-y-4 w-full">
          <h3 className="text-lg font-semibold text-black border-b pb-2">Informações de Saúde</h3>

          <div className="w-full">
            <label className="block text-sm font-medium text-black">
              Condições Médicas (separar por vírgulas)
            </label>
            <textarea
              value={condicoesMedicas}
              onChange={(e) => setCondicoesMedicas(e.target.value)}
              className="mt-1 block w-full border border-black rounded-md p-2 text-black placeholder-gray-400"
              rows={2}
              placeholder="Ex: Hipertensão, Diabetes, Asma"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-black">Alergias (separar por vírgulas)</label>
            <textarea
              value={alergias}
              onChange={(e) => setAlergias(e.target.value)}
              className="mt-1 block w-full border border-black rounded-md p-2 text-black placeholder-gray-400"
              rows={2}
              placeholder="Ex: Penicilina, Látex"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="bg-black text-white rounded-md px-6 py-2 font-semibold hover:bg-gray-800"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}




