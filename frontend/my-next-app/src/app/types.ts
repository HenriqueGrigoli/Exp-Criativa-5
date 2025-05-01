export interface Usuario {
    id: string;
    nomeCompleto: string;
    email: string;
    cpf: string;
    tipoMoradia: string;
    aprovado: boolean;
    antecedentesCriminais?: string;
  }