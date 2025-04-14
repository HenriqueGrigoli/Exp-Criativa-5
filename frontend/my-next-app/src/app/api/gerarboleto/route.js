'use client';

import { useState } from 'react';

export default function Doacoes() {
  const [loading, setLoading] = useState(false);

  async function gerarBoleto() {
    setLoading(true);

    try {
      const response = await fetch('/api/gerarboleto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Preencha com seus dados reais para gerar boleto
          nome: 'Nome do doador',
          email: 'email@exemplo.com',
          cpf: '12345678909',
          telefone: '(11) 99999-9999',
          rua: 'Rua Exemplo',
          numero: '123',
          complemento: 'Apto 1',
          bairro: 'Centro',
          cidade: 'São Paulo',
          estado: 'SP',
          cep: '01001-000',
        }),
      });

      const data = await response.json();

      // Aqui está o ajuste principal:
      const urlSlip = data.create_request?.url_slip;

      if (!urlSlip) {
        alert(`Erro ao gerar boleto: ${JSON.stringify(data)}`);
        console.error('Erro ao gerar boleto:', data);
        return;
      }

      window.open(urlSlip, '_blank');
    } catch (error) {
      console.error('Erro inesperado:', error);
      alert('Erro inesperado ao gerar o boleto.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={gerarBoleto} disabled={loading}>
        {loading ? 'Gerando boleto...' : 'Gerar Boleto'}
      </button>
    </div>
  );
}
