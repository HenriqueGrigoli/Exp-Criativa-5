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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar/Navbar */}
      <div className="w-64 bg-indigo-700 text-white shadow-lg">
        <div className="p-4 flex flex-col items-center border-b border-indigo-600">
          <div className="h-16 w-16 rounded-full bg-indigo-500 flex items-center justify-center mb-2">
            <span className="text-xl font-semibold">AD</span>
          </div>
          <h2 className="text-lg font-semibold">Admin</h2>
          <p className="text-xs text-indigo-200">admin@example.com</p>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg bg-indigo-800">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg hover:bg-indigo-800">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Usuários
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg hover:bg-indigo-800">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Documentos
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg hover:bg-indigo-800">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Configurações
              </a>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 w-64 p-4">
          <button className="flex items-center p-2 w-full rounded-lg hover:bg-indigo-800">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-indigo-250">
        <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-sm m-4">
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
    </div>
  </Layout>
)};