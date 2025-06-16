"use client";

import { Imigrante, Usuario } from "../types";
import { useState } from "react";

interface ImigrantesTableProps {
  imigrantes: Imigrante[];
  currentPage: number;
  imigrantesPerPage: number;
  loading: boolean;
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onDelete: (id: string) => void;
  onPageChange: (page: number) => void;
  fetchImigrantes: () => void;
}

export default function ImigrantesTable({
  imigrantes,
  currentPage,
  imigrantesPerPage,
  loading,
  onActivate,
  onDeactivate,
  onDelete,
  onPageChange,
  fetchImigrantes
}: ImigrantesTableProps) {
  const indexOfLastImigrante = currentPage * imigrantesPerPage;
  const indexOfFirstImigrante = indexOfLastImigrante - imigrantesPerPage;
  const currentImigrantes = imigrantes.slice(indexOfFirstImigrante, indexOfLastImigrante);
  const totalPages = Math.ceil(imigrantes.length / imigrantesPerPage);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImigranteId, setSelectedImigranteId] = useState<string | null>(null);
  const [selectedImigranteIdFamilia, setSelectedImigranteIdFamilia] = useState<string | null>(null);
  const [familiasRecomendadas, setFamiliasRecomendadas] = useState<Usuario[]>([]);

  const fetchRecomendacao = async (id: string, familiaId: string) => {
    try {
      const response = await fetch("http://localhost:8080/api/imigrantes/recomendar/" + id);
      if (!response.ok) throw new Error("Erro ao carregar recomendações");

      const data = await response.json();
      setFamiliasRecomendadas(data);
      setSelectedImigranteId(id);
      setSelectedImigranteIdFamilia(familiaId);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Erro ao buscar famílias recomendadas:", err);
    }
  };

  const vincularFamiliaAcolhedoraAoImigrante = async (idFamiliaAcolhedora: string | null) => {
    try {
      const response = await fetch("http://localhost:8080/api/imigrantes/associar/" + selectedImigranteIdFamilia + "/" + idFamiliaAcolhedora);
      if (!response.ok) throw new Error("Erro ao associar familia");

      const data = await response.json();
      setIsModalOpen(false);
      fetchImigrantes();
      
    } catch (err) {
      console.error("Erro ao associar famílias:", err);
    }
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">País de Origem</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Situação Migratória</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Documentos</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Família</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Família Acolhedora</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentImigrantes.length > 0 ? (
              currentImigrantes.map((imigrante) => (
                <tr key={imigrante.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-black">{imigrante.nomeCompleto}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{imigrante.paisOrigem}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{imigrante.situacaoMigratoria}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {imigrante.possuiDocumento && imigrante.numeroDocumento ? (
                      <a
                        href={`http://localhost:8080/api/imigrantes/uploads/${imigrante.numeroDocumento}`}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        {imigrante.tipoDocumento || "Documento"}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{imigrante.familiaId || "N/A"}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{imigrante.usuarioAcolhedor || "N/A"}</td>
                  <td className="px-6 py-4">
                    {imigrante.ativo ? (
                      <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Ativo
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Inativo
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 space-y-2">
                    <button
                      onClick={() => fetchRecomendacao(imigrante.id, imigrante.familiaId!)}
                      className="block w-full px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Famílias recomendadas
                    </button>
                    {imigrante.ativo ? (
                      <button
                        onClick={() => onDeactivate(imigrante.id)}
                        className="block w-full px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                        disabled={loading}
                      >
                        Desativar
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => onActivate(imigrante.id)}
                          className="block w-full px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                          disabled={loading}
                        >
                          Ativar
                        </button>
                        <button
                          onClick={() => onDelete(imigrante.id)}
                          className="block w-full px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          disabled={loading}
                        >
                          Remover
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  Nenhum imigrante encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal destacada */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 p-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Selecionar Família Acolhedora
            </h2>

            <table className="w-full mb-4 border-t border-b divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-2 px-4 text-sm font-semibold text-gray-700">Nome</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold text-gray-700">Pontuação</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold text-gray-700">Ação</th>
                </tr>
              </thead>
              <tbody>
                {familiasRecomendadas.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 text-sm text-gray-800">{item.nomeCompleto}</td>
                    <td className="py-2 px-4 text-sm text-gray-800">
                      <div className="w-full bg-gray-200 rounded h-4">
                        <div
                          className="bg-blue-600 h-4 rounded text-xs text-white text-center"
                          style={{ width: `${item.pontuacao || 0}%` }}
                        >
                          {item.pontuacao || 0}%
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => {
                          vincularFamiliaAcolhedoraAoImigrante(item.id);
                        }}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                      >
                        Selecionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
