"use client";

import { Usuario } from "../types";
import { useState } from 'react';

interface UsersTableProps {
  usuarios: Usuario[];
  currentPage: number;
  usuariosPerPage: number;
  loading: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onPageChange: (page: number) => void;
}

export default function UsersTable({
  usuarios,
  currentPage,
  usuariosPerPage,
  loading,
  onApprove,
  onReject,
  onPageChange
}: UsersTableProps) {
  const indexOfLastUsuario = currentPage * usuariosPerPage;
  const indexOfFirstUsuario = indexOfLastUsuario - usuariosPerPage;
  const currentUsuarios = usuarios.slice(indexOfFirstUsuario, indexOfLastUsuario);
  const totalPages = Math.ceil(usuarios.length / usuariosPerPage);

  return (
    <>
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Moradia</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documentos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsuarios.length > 0 ? (
                currentUsuarios.map((usuario) => (
                  <UserRow 
                    key={usuario.id} 
                    usuario={usuario} 
                    onApprove={onApprove} 
                    onReject={onReject} 
                    loading={loading}
                  />
                ))
              ) : (
                <tr key="no-results-row">
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    Nenhum usuário encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          loading={loading}
          indexOfFirstUsuario={indexOfFirstUsuario}
          indexOfLastUsuario={indexOfLastUsuario}
          totalUsuarios={usuarios.length}
        />
      )}
    </>
  );
}

function UserRow({ usuario, onApprove, onReject, loading }: { 
  usuario: Usuario; 
  onApprove: (id: string) => void; 
  onReject: (id: string) => void;
  loading: boolean;
}) {
  return (
    <tr key={`user-row-${usuario.id}`} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{usuario.nomeCompleto}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{usuario.email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{usuario.cpf}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{usuario.tipoMoradia}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {usuario.antecedentesCriminais && (
          <a 
            href={`http://localhost:8080/api/usuarios/uploads/${usuario.antecedentesCriminais}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Ver Documento
          </a>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge aprovado={usuario.aprovado} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          {!usuario.aprovado && (
            <button 
              onClick={() => onApprove(usuario.id)}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={loading}
            >
              Aprovar
            </button>
          )}
          <button 
            onClick={() => onReject(usuario.id)}
            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={loading}
          >
            Remover
          </button>
        </div>
      </td>
    </tr>
  );
}

function StatusBadge({ aprovado }: { aprovado: boolean }) {
  return aprovado ? (
    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
      Aprovado
    </span>
  ) : (
    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
      Pendente
    </span>
  );
}

function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  loading,
  indexOfFirstUsuario,
  indexOfLastUsuario,
  totalUsuarios
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void;
  loading: boolean;
  indexOfFirstUsuario: number;
  indexOfLastUsuario: number;
  totalUsuarios: number;
}) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-b-lg">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1 || loading}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages || loading}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{indexOfFirstUsuario + 1}</span> a <span className="font-medium">{Math.min(indexOfLastUsuario, totalUsuarios)}</span> de <span className="font-medium">{totalUsuarios}</span> resultados
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1 || loading}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <span className="sr-only">Anterior</span>
              &larr;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={`page-${page}`}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === page ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'}`}
                disabled={loading}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages || loading}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <span className="sr-only">Próxima</span>
              &rarr;
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}