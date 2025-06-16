"use client";

import { useState, useEffect } from 'react';
import Layout from "../Componentes/layout";
import AdminLayout from '../Componentes/AdminLayout';
import AdminSidebar from '../Componentes/AdminSidebar';
import UsersTable from '../Componentes/UsersTable';
import ImigrantesTable from '../Componentes/ImigrantesTable'; // Novo import
import StatusMessage from '../Componentes/StatusMessage';
import SearchBar from '../Componentes/SearchBar';
import LoadingSpinner from '../Componentes/LoadingSpinner';
import registerFamily from '../Componentes/registerFamily';
import { Usuario, Imigrante } from '../types'; // Atualizado para incluir Imigrante
import NovoCadastro from '../Componentes/registerFamily';


export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('home');
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [imigrantes, setImigrantes] = useState<Imigrante[]>([]); // Novo estado
  const [loading, setLoading] = useState(true);
  const [loadingImigrantes, setLoadingImigrantes] = useState(true); // Novo estado de loading
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermImigrantes, setSearchTermImigrantes] = useState(''); // Novo termo de busca
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageImigrantes, setCurrentPageImigrantes] = useState(1); // Nova páginação
  const [error, setError] = useState<string | null>(null);
  const [errorImigrantes, setErrorImigrantes] = useState<string | null>(null); // Novo erro
  const [success, setSuccess] = useState<string | null>(null);
  const usuariosPerPage = 10;
  const imigrantesPerPage = 10; // Nova constante

  useEffect(() => {
    fetchUsuarios();
    fetchImigrantes(); // Nova chamada
  }, []);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/usuarios');
      
      if (!response.ok) {
        throw new Error('Erro ao carregar usuários');
      }
      
      const data = await response.json();
      setUsuarios(data);
      setError(null);
    } catch (err) {
      setError('Falha ao carregar dados. Tente novamente.');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  // Nova função para carregar imigrantes
  const fetchImigrantes = async () => {
    try {
      setLoadingImigrantes(true);
      const response = await fetch('http://localhost:8080/api/imigrantes');
      
      if (!response.ok) {
        throw new Error('Erro ao carregar imigrantes');
      }
      
      const data = await response.json();
      setImigrantes(data);
      setErrorImigrantes(null);
    } catch (err) {
      setErrorImigrantes('Falha ao carregar dados de imigrantes. Tente novamente.');
      console.error('Erro:', err);
    } finally {
      setLoadingImigrantes(false);
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

  // Novas funções para manipulação de imigrantes
  const handleActivate = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/imigrantes/${id}/ativar`, {
        method: 'PATCH'
      });
      
      if (response.ok) {
        setImigrantes(imigrantes.map(imigrante => 
          imigrante.id === id ? { ...imigrante, ativo: true } : imigrante
        ));
        setSuccess('Imigrante ativado com sucesso!');
        setTimeout(() => setSuccess(null), 3000);
      } else {
        throw new Error('Falha na ativação');
      }
    } catch (err) {
      setErrorImigrantes('Erro ao ativar imigrante');
      console.error('Erro:', err);
    }
  };

  const handleDeactivate = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/imigrantes/${id}/desativar`, {
        method: 'PATCH'
      });
      
      if (response.ok) {
        setImigrantes(imigrantes.map(imigrante => 
          imigrante.id === id ? { ...imigrante, ativo: false } : imigrante
        ));
        setSuccess('Imigrante desativado com sucesso!');
        setTimeout(() => setSuccess(null), 3000);
      } else {
        throw new Error('Falha na desativação');
      }
    } catch (err) {
      setErrorImigrantes('Erro ao desativar imigrante');
      console.error('Erro:', err);
    }
  };

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.cpf.includes(searchTerm)
  );

  const filteredImigrantes = imigrantes.filter(imigrante =>
    imigrante.nomeCompleto.toLowerCase().includes(searchTermImigrantes.toLowerCase()) ||
    (imigrante.contato?.email?.toLowerCase().includes(searchTermImigrantes.toLowerCase()) ?? false) ||
    imigrante.paisOrigem.toLowerCase().includes(searchTermImigrantes.toLowerCase()) ||
    imigrante.numeroDocumento?.includes(searchTermImigrantes)
  );

   const renderActiveSection = () => {
    switch (activeSection) {
      case 'usuarios':
        return (
          <>
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
          </>
        );
      case 'imigrantes':
        return (
          <>
            <SearchBar 
              searchTerm={searchTermImigrantes}
              onSearchChange={(e) => {
                setSearchTermImigrantes(e.target.value);
                setCurrentPageImigrantes(1);
              }}
            />
            {loadingImigrantes ? (
              <LoadingSpinner />
            ) : (
              <>
                <ImigrantesTable
                  imigrantes={filteredImigrantes}
                  currentPage={currentPageImigrantes}
                  imigrantesPerPage={imigrantesPerPage}
                  loading={loadingImigrantes}
                  onActivate={handleActivate}
                  onDeactivate={handleDeactivate}
                  onPageChange={setCurrentPageImigrantes}
                  fetchImigrantes={fetchImigrantes}
                  onDelete={fetchImigrantes}  // <== passe handleDelete
                />
                <NovoCadastro onSuccess={fetchImigrantes} />
              </>
            )}
          </>
        );
      case 'configuracoes':
        return (
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Configurações</h2>
            <p>Configurações do sistema serão exibidas aqui.</p>
          </div>
        );
      default:
        return (
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Bem-vindo ao Painel Admin</h2>
            <p>Selecione uma seção no menu lateral para começar.</p>
          </div>
        );
    }
  };

  return (
    <Layout>
      <AdminLayout>
        <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-sm m-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Painel de Administração</h1>
          
          <StatusMessage error={error || errorImigrantes} success={success} />
          
          {renderActiveSection()}
        </div>
      </AdminLayout>
    </Layout>  
  );
}