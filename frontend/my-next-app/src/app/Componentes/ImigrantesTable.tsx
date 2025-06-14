"use client";

import { Imigrante } from "../types";
import { useState } from 'react';

interface ImigrantesTableProps {
  imigrantes: Imigrante[];
  currentPage: number;
  imigrantesPerPage: number;
  loading: boolean;
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onDelete: (id: string) => void;
  onPageChange: (page: number) => void;
}

export default function ImigrantesTable({
  imigrantes,
  currentPage,
  imigrantesPerPage,
  loading,
  onActivate,
  onDeactivate,
  onDelete,
  onPageChange
}: ImigrantesTableProps) {
  const indexOfLastImigrante = currentPage * imigrantesPerPage;
  const indexOfFirstImigrante = indexOfLastImigrante - imigrantesPerPage;
  const currentImigrantes = imigrantes.slice(indexOfFirstImigrante, indexOfLastImigrante);
  const totalPages = Math.ceil(imigrantes.length / imigrantesPerPage);

  return (
    <>
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">País de Origem</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Situação Migratória</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Documentos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Família</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentImigrantes.length > 0 ? (
                currentImigrantes.map((imigrante) => (
                  <ImigranteRow 
                    key={imigrante.id} 
                    imigrante={imigrante} 
                    onActivate={onActivate} 
                    onDeactivate={onDeactivate} 
                    onDelete={onDelete}
                    loading={loading}
                  />
                ))
              ) : (
                <tr key="no-results-row">
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-black">
                    Nenhum imigrante encontrado
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
          indexOfFirstItem={indexOfFirstImigrante}
          indexOfLastItem={indexOfLastImigrante}
          totalItems={imigrantes.length}
        />
      )}
    </>
  );
}

function ImigranteRow({ imigrante, onActivate, onDeactivate, onDelete, loading }: { 
  imigrante: Imigrante; 
  onActivate: (id: string) => void; 
  onDeactivate: (id: string) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}) {

  return (
    <tr key={`imigrante-row-${imigrante.id}`} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-black">{imigrante.nomeCompleto}</div>
        <div className="text-sm text-black">{imigrante.contato?.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
        {imigrante.paisOrigem}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
        {imigrante.situacaoMigratoria}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
        {imigrante.possuiDocumento && imigrante.numeroDocumento && (
          <a 
            href={`http://localhost:8080/api/imigrantes/uploads/${imigrante.numeroDocumento}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {imigrante.tipoDocumento || 'Documento'}
          </a>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
        {imigrante.familiaId || 'N/A'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge ativo={imigrante.ativo} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
        <div className="flex space-x-2">
            {imigrante.ativo ? (
              <>
                <button 
                  onClick={() => onDeactivate(imigrante.id!)}
                  className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50"
                  disabled={loading}
                >
                  Desativar
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => onActivate(imigrante.id!)}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                  disabled={loading}
                >
                  Ativar
                </button>
                <button 
                  onClick={() => onDelete(imigrante.id!)}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                  disabled={loading}
                >
                  Remover
                </button>
              </>
            )}
        </div>
      </td>
    </tr>
  );
}

function StatusBadge({ ativo }: { ativo: boolean }) {
  return ativo ? (
    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
      Ativo
    </span>
  ) : (
    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
      Inativo
    </span>
  );
}

function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  loading,
  indexOfFirstItem,
  indexOfLastItem,
  totalItems
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void;
  loading: boolean;
  indexOfFirstItem: number;
  indexOfLastItem: number;
  totalItems: number;
}) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-b-lg">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1 || loading}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages || loading}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-black">
            Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, totalItems)}</span> de <span className="font-medium">{totalItems}</span> resultados
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1 || loading}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-black ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <span className="sr-only">Anterior</span>
              &larr;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={`page-${page}`}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === page ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600' : 'text-black ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'}`}
                disabled={loading}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages || loading}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-black ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
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
