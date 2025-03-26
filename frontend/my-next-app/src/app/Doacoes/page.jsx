"use client";
import { useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from 'qrcode.react';

export default function Doacoes() {
  const [loading, setLoading] = useState(false);
  const [urlBoleto, setUrlBoleto] = useState("");

  async function gerarBoleto() {
    setLoading(true);

    const resposta = await axios.post('/api/gerarboleto', {
      email: 'exemplo',
      nome: 'exemplo',
      cpf: 'exemplo',
      telefone: 'exemplo',
      rua: 'exemplo',
      numero: 'exemplo',
      complemento: 'exemplo',
      bairro: 'exemplo',
      cidade: 'exemplo',
      estado: 'exemplo',

      cep: 'exemplo'
    });

    if (resposta.data.create_request) {
      setUrlBoleto(resposta.data.create_request.bank_slip.url_slip);
    } else {
      alert('Estamos com problema, tente novamente mais tarde');
    }

    setLoading(false);
  }

  return (
    <div style={{
        backgroundColor: '#fff',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#333'
    }}>
      <h1>Página de Doações</h1>
      {!urlBoleto ? (
        <button onClick={gerarBoleto} disabled={loading} style={{padding:'8px', cursor:'pointer'}}>
          {loading ? 'Gerando Boleto...' : 'Gerar Boleto de R$10,00'}
        </button>
      ) : (
        <>
          <p>Escaneie o QR Code abaixo para pagar o boleto:</p>
          <QRCodeCanvas value={urlBoleto} size={256} />
          <a href={urlBoleto} target="_blank" style={{ marginTop: '15px', color: '#0066ff' }}>
            Abrir boleto diretamente
          </a>
        </>
      )}
    </div>
  );
}
