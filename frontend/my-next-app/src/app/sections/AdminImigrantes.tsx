"use client";

import { useState, useEffect } from "react";
import ImigrantesTable from "../Componentes/ImigrantesTable";
import SearchBar from "../Componentes/SearchBar";
import LoadingSpinner from "../Componentes/LoadingSpinner";
import NovoCadastro from "../Componentes/registerFamily";
import StatusMessage from "../Componentes/StatusMessage";
import MatchTable from "../Componentes/MatchTable";
import { Imigrante } from "../types";

type NovoCadastroProps = {
  onSuccess: () => void;
};

export default function AdminImigrantes() {
  const [imigrantes, setImigrantes] = useState<Imigrante[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentPageMatches, setCurrentPageMatches] = useState(1);
  const imigrantesPerPage = 10;
  const matchesPerPage = 5;

  useEffect(() => {
    fetchImigrantes();
  }, []);

  const fetchImigrantes = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/imigrantes");
      if (!response.ok) {
        throw new Error("Erro ao carregar imigrantes");
      }
      const data = await response.json();
      setImigrantes(data);
      setError(null);
    } catch (err) {
      setError("Falha ao carregar dados de imigrantes. Tente novamente.");
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:8080/api/imigrantes/${id}/ativar`, {
      method: "PATCH",
    });

    if (response.ok) {
      setImigrantes(imigrantes.map(imigrante =>
        imigrante.id === id ? { ...imigrante, ativo: true } : imigrante
      ));

    } else {
      throw new Error("Falha na ativação");
    }
  } catch (err) {
    setError("Erro ao ativar imigrante");
    console.error(err);
  }
};

  const handleDeactivate = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/imigrantes/${id}/desativar`, {
        method: "PATCH",
      });

      if (response.ok) {
        setImigrantes(
          imigrantes.map((imigrante) =>
            imigrante.id === id ? { ...imigrante, ativo: false } : imigrante
          )
        );
      } else {
        throw new Error("Falha na desativação");
      }
    } catch (err) {
      setError("Erro ao desativar imigrante");
      console.error("Erro:", err);
    }
  };



const handleDelete = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:8080/api/imigrantes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setImigrantes(imigrantes.filter(imigrante => imigrante.id !== id));
      setSuccess("Imigrante deletado com sucesso!");
      setTimeout(() => setSuccess(null), 3000);
    } else {
      throw new Error("Falha ao deletar");
    }
  } catch (err) {
    setError("Erro ao deletar imigrante");
    console.error(err);
  }
};

  const handleCadastroSuccess = () => {
    setSearchTerm(""); // Limpa busca
    setCurrentPage(1); // Volta para primeira página
    fetchImigrantes(); // Atualiza lista
  };

  const filteredImigrantes = imigrantes.filter((imigrante) =>
    imigrante.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (imigrante.contato?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
    imigrante.paisOrigem.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (imigrante.numeroDocumento?.includes(searchTerm) ?? false)
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-black">Gerenciar Imigrantes</h2>

      <StatusMessage error={error} success={success} />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
        <ImigrantesTable
          imigrantes={filteredImigrantes}
          currentPage={currentPage}
          imigrantesPerPage={imigrantesPerPage}
          loading={loading}
          onActivate={handleActivate}
          onDeactivate={handleDeactivate}
          onDelete={handleDelete}  // <== passe handleDelete
          onPageChange={setCurrentPage}
        />

        <MatchTable
            imigrantes={filteredImigrantes.filter(i => !i.familiaId)}
            loading={loading}
            currentPage={currentPageMatches}
            matchesPerPage={matchesPerPage}
            onPageChange={setCurrentPageMatches}
        />
          <NovoCadastro onSuccess={handleCadastroSuccess} />
        </>
      )}
    </div>
  );
}
