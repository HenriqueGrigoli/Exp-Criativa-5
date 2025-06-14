export interface Usuario {
  id: string;
  nomeCompleto: string;
  email: string;
  telefone?: string;
  cpf: string;
  
  // Informações residenciais
  tipoMoradia: string;
  tempoResidencia?: string;
  enderecoCompleto?: string;
  quartosDisponiveis: number;  // Campo que estava faltando
  banheiros: number;          // Campo que estava faltando
  
  // Situação financeira
  rendaFamiliar?: string;
  pessoasDependentes?: number;
  
  // Documentação e compromisso
  aceitaVisitas?: boolean;
  disponibilidadeTreinamento?: boolean;
  periodoMinimoAcolhimento?: string;
  antecedentesCriminais?: string;
  
  // Motivação e perfil
  motivacao?: string;
  experienciaPrevia?: string;
  idiomasFalados: string[];   // Campo que estava faltando
  aprovado: boolean;
  
  // Outros campos que você pode precisar
  observacoes?: string;
  dataCadastro?: Date;
}

export interface Imigrante {
  id: string;
  nomeCompleto: string;
  dataNascimento: string;
  genero: string;
  paisOrigem: string;
  possuiDocumento: boolean;
  tipoDocumento?: string;
  numeroDocumento?: string;
  dataChegada: string;
  situacaoMigratoria: string;
  familiaId?: string;
  ativo: boolean;
  contato?: {
    telefone?: string;
    email?: string;
    endereco?: string;
  };
  saude?: {
    condicoesMedicas?: string[];
    alergias?: string[];
  };
  idiomasFalados: string[];
}