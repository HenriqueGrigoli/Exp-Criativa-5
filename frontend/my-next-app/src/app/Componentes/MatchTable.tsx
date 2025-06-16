"use client";

import { useState, useEffect } from "react";
import { Usuario, Imigrante } from "../types";
import LoadingSpinner from "./LoadingSpinner";

interface MatchTable {
  imigrantes: Imigrante[];
  loading: boolean;
  currentPage: number;
  matchesPerPage: number;
  onPageChange: (page: number) => void;
}

type Match = {
  familiaAcolhedora: Usuario;
  familiaImigrante: Imigrante;
  score: number;
};

export default function MatchTable({
  imigrantes,
  loading,
  currentPage,
  matchesPerPage,
  onPageChange,
}: MatchTable) {
  const [familiasAcolhedoras, setFamiliasAcolhedoras] = useState<Usuario[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loadingMatches, setLoadingMatches] = useState(true);

  useEffect(() => {
    const fetchFamiliasAcolhedoras = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/usuarios");
        if (!response.ok) throw new Error("Erro ao carregar famílias acolhedoras");
        const data = await response.json();
        setFamiliasAcolhedoras(data.filter((u: Usuario) => u.aprovado));
      } catch (err) {
        console.error("Erro:", err);
      }
    };

    fetchFamiliasAcolhedoras();
  }, []);

  useEffect(() => {
    if (familiasAcolhedoras.length > 0 && imigrantes.length > 0) {
      generateMatches();
    }else {
      setLoadingMatches(false);
    }
  }, [familiasAcolhedoras, imigrantes]);

  const generateMatches = async () => {
    setLoadingMatches(true);
    try {
      let familiaAcolhedora: Match[] = [];
      
      const response = await fetch(
        `http://localhost:8080/api/imigrantes/recomendar`
      );
      if (response.ok) {
        familiaAcolhedora = await response.json();
       /*  if (familiaAcolhedora) {
          newMatches.push({
            familiaAcolhedora,
            familiaImigrante: imigrante,
            score: calculateMatchScore(familiaAcolhedora, imigrante)
          });
        } */
       
      }

      setMatches(familiaAcolhedora);
    } catch (err) {
      console.error("Erro ao gerar matches:", err);
    } finally {
      setLoadingMatches(false);
    }
  };

  const calculateMatchScore = (familia: Usuario, imigrante: Imigrante): number => {
    let score = 0;
    
    // Pontuação baseada em quartos disponíveis
    const membrosFamilia = imigrante.familiaId?.length || 1;
    const quartosNecessarios = Math.ceil(membrosFamilia / 2);
    if (familia.quartosDisponiveis >= quartosNecessarios) {
      score += 30;
    }
    
    // Pontuação por compatibilidade de idiomas
    const idiomasComuns = familia.idiomasFalados?.filter(idioma => 
        imigrante.idiomasFalados?.includes(idioma)
    ).length || 0;
    score += idiomasComuns * 10;
    
    return score;
  };

const handleAssign = async (familiaAcolhedoraId: string, imigranteId: string) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/imigrantes/${imigranteId}/atribuir-familia?familiaId=${familiaAcolhedoraId}`,
      {
        method: "PATCH",
      }
    );

    if (response.ok) {
      setMatches(matches.filter(match => match.familiaImigrante.id !== imigranteId));
    }
  } catch (err) {
    console.error("Erro ao atribuir família:", err);
  }
};

  const paginatedMatches = matches.slice(
    (currentPage - 1) * matchesPerPage,
    currentPage * matchesPerPage
  );

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Famílias Acolhedoras Sugeridas</h3>
      
      {loadingMatches ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Família Imigrante</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Família Acolhedora</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compatibilidade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedMatches.map((match, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{match.familiaImigrante.nomeCompleto}</div>
                      <div className="text-sm text-gray-500">{match.familiaImigrante.paisOrigem}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{match.familiaAcolhedora?.nomeCompleto}</div>
                      <div className="text-sm text-gray-500">
                        {match.familiaAcolhedora?.quartosDisponiveis} quartos, {match.familiaAcolhedora?.banheiros} banheiros
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${Math.min(100, match.score)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{match.score} pontos</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleAssign(match.familiaAcolhedora.id, match.familiaImigrante.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Atribuir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Paginação */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              Anterior
            </button>
            <span>Página {currentPage}</span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage * matchesPerPage >= matches.length}
              className="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  );
}