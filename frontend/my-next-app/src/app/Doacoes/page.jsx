"use client";

import { useState } from "react";
import axios from "axios";
import Layout from "../Componentes/layout";
import "./doacoes.css";


export default function Doacoes() {
  const [loading, setLoading] = useState(false);
  const [urlBoleto, setUrlBoleto] = useState("");
  const [digitableLine, setDigitableLine] = useState("");
  const [valor, setValor] = useState("");

  async function gerarBoleto() {
    if (!valor || isNaN(valor) || parseFloat(valor) <= 0) {
      alert("Informe um valor válido para a doação.");
      return;
    }

    setLoading(true);

    try {
      const resposta = await axios.post("/api/gerarboleto", {
        valor: parseFloat(valor)
      });

      const data = resposta.data;

      if (data?.url_slip) {
        setUrlBoleto(data.url_slip);
        setDigitableLine(data.digitable_line);
      } else {
        console.error("Erro recebido da API:", data);
        alert("Estamos com problema, tente novamente mais tarde");
      }
    } catch (error) {
      console.error("Erro na chamada axios:", error.response?.data || error.message);
      alert("Erro inesperado, verifique o console.");
    }

    setLoading(false);
  }

  return (
    <Layout>
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px 20px 70px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          color: "#333"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
            maxWidth: "1000px",
            flexWrap: "wrap",
            marginBottom: "30px",
            textAlign: "left"
          }}
        >
          <img
            src="/refugiadoz.png"
            alt="Refugiados"
            style={{
              maxWidth: "400px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)"
            }}
          />

          <div style={{ maxWidth: "500px", lineHeight: "1.7" }}>
            <h1 style={{ fontSize: "2.2rem", color: "#004080", marginBottom: "15px" }}>
              Ajude a Transformar Vidas
            </h1>
            <p>
              Estamos promovendo uma campanha de arrecadação para apoiar refugiados que chegaram recentemente ao Brasil.
            </p>
            <p style={{ marginTop: "15px" }}>
              As doações serão utilizadas para cobrir <strong>necessidades básicas</strong> como alimentação,
              roupas, medicamentos e transporte.
            </p>
            <p style={{ marginTop: "15px" }}>
              Parte da sua doação também será destinada a <strong>ajudar famílias e indivíduos</strong> que estão
              generosamente cedendo suas casas para acolher essas pessoas.
            </p>
            <p style={{ marginTop: "15px", fontWeight: "bold" }}>
              Juntos, podemos oferecer acolhimento, dignidade e esperança.
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          {!urlBoleto ? (
            <>
              <input
                type="number"
                placeholder="Digite o valor a ser doado: "
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                style={{
                  padding: "10px",
                  marginBottom: "15px",
                  width: "220px",
                  textAlign: "center",
                  border: "1px solid #ccc",
                  borderRadius: "4px"
                }}
              />
              <br />
              <button
                onClick={gerarBoleto}
                disabled={loading}
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                  backgroundColor: "#0066ff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px"
                }}
              >
                {loading ? "Gerando Boleto..." : "Gerar Boleto"}
              </button>
            </>
          ) : (
            <>
              <a
                href={urlBoleto}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "20px",
                  padding: "10px 20px",
                  backgroundColor: "#0066ff",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "4px"
                }}
              >
                Abrir boleto
              </a>
              <p style={{ marginTop: "20px", fontWeight: "bold" }}>Número do boleto:</p>
              <p>{digitableLine}</p>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}