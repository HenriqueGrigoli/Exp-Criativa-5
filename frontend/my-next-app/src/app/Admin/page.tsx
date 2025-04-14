"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../Componentes/layout';

interface Usuario {
  id: string;
  nomeCompleto: string;
  email: string;
  cpf: string;
  tipoMoradia: string;
  aprovado: boolean;
  antecedentesCriminais?: string;
}

export default function AdminDashboard() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const usuariosPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/usuarios');
      
      if (!response.ok) {
        throw new Error('Erro ao carregar usuários');
      }
      
      const data = await response.json();
      console.log('Dados recebidos:', data);
      setUsuarios(data);
      setError(null);
    } catch (err) {
      setError('Falha ao carregar dados. Tente novamente.');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${id}/aprovar`, {
        method: 'PATCH'
      });
      
      if (response.ok) {
        setUsuarios(usuarios.map(user => 
          user.id === id ? { ...user, aprovado: true } : user
        ));
        setSuccess('Usuário aprovado com sucesso!');
        setTimeout(() => setSuccess(null), 3000);
      } else {
        throw new Error('Falha na aprovação');
      }
    } catch (err) {
      setError('Erro ao aprovar usuário');
      console.error('Erro:', err);
    }
  };
  
  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${id}/rejeitar`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setUsuarios(usuarios.filter(user => user.id !== id));
        setSuccess('Usuário removido com sucesso!');
        setTimeout(() => setSuccess(null), 3000);
      } else {
        throw new Error('Falha na remoção');
      }
    } catch (err) {
      setError('Erro ao remover usuário');
      console.error('Erro:', err);
    }
  };

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.cpf.includes(searchTerm)
  );

  // Paginação
  const indexOfLastUsuario = currentPage * usuariosPerPage;
  const indexOfFirstUsuario = indexOfLastUsuario - usuariosPerPage;
  const currentUsuarios = filteredUsuarios.slice(indexOfFirstUsuario, indexOfLastUsuario);
  const totalPages = Math.ceil(filteredUsuarios.length / usuariosPerPage);

  return (
    <Layout>
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Painel de Administração</h1>
        
        {/* Mensagens de status */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}
        
        <input
          type="text"
          placeholder="Buscar por nome, email ou CPF"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full p-4 border border-gray-300 rounded-lg 
                    text-gray-800 text-base md:text-lg
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    placeholder-gray-500
                    shadow-sm transition-all duration-200"
        />

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
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
                                key={`doc-link-${usuario.id}`}
                              >
                                Ver Documento
                              </a>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {usuario.aprovado ? (
                              <span key={`status-approved-${usuario.id}`} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Aprovado
                              </span>
                            ) : (
                              <span key={`status-pending-${usuario.id}`} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Pendente
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              {!usuario.aprovado && (
                                <button 
                                  onClick={() => handleApprove(usuario.id)}
                                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                                  disabled={loading}
                                >
                                  Aprovar
                                </button>
                              )}
                              <button 
                                onClick={() => handleReject(usuario.id)}
                                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                                disabled={loading}
                              >
                                Remover
                              </button>
                            </div>
                          </td>
                        </tr>
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
              <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-b-lg">
                <div className="flex flex-1 justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1 || loading}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || loading}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Próxima
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Mostrando <span className="font-medium">{indexOfFirstUsuario + 1}</span> a <span className="font-medium">{Math.min(indexOfLastUsuario, filteredUsuarios.length)}</span> de <span className="font-medium">{filteredUsuarios.length}</span> resultados
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1 || loading}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                      >
                        <span className="sr-only">Anterior</span>
                        &larr;
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={`page-${page}`}
                          onClick={() => setCurrentPage(page)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === page ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'}`}
                          disabled={loading}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
            )}
          </>
        )}
      </div>
    </div>
    </Layout>
  );
}