"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../Componentes/layout';
import './admin.css';

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
      console.log('Dados recebidos:', data); // Adicione este log
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
      <div className="admin-container">
        <h1>Painel de Administração</h1>
        
        {/* Mensagens de status */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <div className="admin-actions">
          <input
            type="text"
            placeholder="Buscar por nome, email ou CPF..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
        </div>

        {loading ? (
          <div className="loading">Carregando...</div>
        ) : (
          <>
            <div className="usuarios-table">
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Tipo de Moradia</th>
                    <th>Documentos</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsuarios.length > 0 ? (
                    currentUsuarios.map((usuario) => (
                      <tr key={`user-row-${usuario.id}`}>
                        <td>{usuario.nomeCompleto}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.cpf}</td>
                        <td>{usuario.tipoMoradia}</td>
                        <td>
                          {usuario.antecedentesCriminais && (
                            <a 
                              href={`http://localhost:8080/api/usuarios/uploads/${usuario.antecedentesCriminais}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="document-link"
                              key={`doc-link-${usuario.id}`}
                            >
                              Ver Documento
                            </a>
                          )}
                        </td>
                        <td>
                          {usuario.aprovado ? (
                            <span key={`status-approved-${usuario.id}`} className="status-badge approved">
                              Aprovado
                            </span>
                          ) : (
                            <span key={`status-pending-${usuario.id}`} className="status-badge pending">
                              Pendente
                            </span>
                          )}
                        </td>
                        <td className="actions">
                          {!usuario.aprovado && (
                            <button 
                              onClick={() => {
                                console.log('ID do usuário para aprovação:', usuario.id);
                                handleApprove(usuario.id);
                              }}
                              className="approve-btn"
                              disabled={loading}
                            >
                              Aprovar
                            </button>
                          )}
                          <button 
                            onClick={() => {
                              console.log('ID do usuário para remoção:', usuario.id);
                              handleReject(usuario.id);
                            }}
                            className="reject-btn"
                            disabled={loading}
                          >
                            Remover
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr key="no-results-row">
                      <td colSpan={7} className="no-results">
                        Nenhum usuário encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  key="pagination-prev"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1 || loading}
                >
                  Anterior
                </button>
                <span key="pagination-info">Página {currentPage} de {totalPages}</span>
                <button 
                  key="pagination-next"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || loading}
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}