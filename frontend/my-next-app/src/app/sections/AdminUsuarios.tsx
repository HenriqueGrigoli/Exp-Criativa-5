"use client";

import { useEffect, useState } from "react";
import { Usuario } from "../types";
import Layout from "../Componentes/layout";
import AdminLayout from "../Componentes/AdminLayout";
import UsersTable from "../Componentes/UsersTable";
import StatusMessage from "../Componentes/StatusMessage";
import SearchBar from "../Componentes/SearchBar";
import LoadingSpinner from "../Componentes/LoadingSpinner";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const usuariosPerPage = 10;

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/usuarios");
      if (!response.ok) throw new Error("Erro ao carregar usuários");
      const data = await response.json();
      setUsuarios(data);
      setError(null);
    } catch (err) {
      setError("Falha ao carregar dados. Tente novamente.");
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${id}/aprovar`, {
        method: "PATCH",
      });
      if (!response.ok) throw new Error("Falha na aprovação");
      setUsuarios((prev) =>
        prev.map((user) => (user.id === id ? { ...user, aprovado: true } : user))
      );
      setSuccess("Usuário aprovado com sucesso!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Erro ao aprovar usuário");
      console.error("Erro:", err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${id}/rejeitar`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Falha na remoção");
      setUsuarios((prev) => prev.filter((user) => user.id !== id));
      setSuccess("Usuário removido com sucesso!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Erro ao remover usuário");
      console.error("Erro:", err);
    }
  };

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.cpf.includes(searchTerm)
  );

  return (
        <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-sm m-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Usuários</h1>
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
            <UsersTable
              usuarios={filteredUsuarios}
              currentPage={currentPage}
              usuariosPerPage={usuariosPerPage}
              loading={loading}
              onApprove={handleApprove}
              onReject={handleReject}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
  );
}
