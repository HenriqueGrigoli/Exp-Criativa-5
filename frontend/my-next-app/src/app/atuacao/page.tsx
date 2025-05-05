"use client";

import Layout from "../Componentes/layout";
import "./atuacao.css";

export default function Atuacao() {
  return (
    <Layout>
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px 20px 70px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#333",
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
            textAlign: "left",
          }}
        >
          <img
            src="/refugiadoz2.png"
            alt="Refugiados"
            style={{
              maxWidth: "400px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          />

          <div style={{ maxWidth: "500px", lineHeight: "1.7" }}>
            <h1 style={{ fontSize: "2.2rem", color: "#004080", marginBottom: "15px" }}>
              Como Atuamos ao Lado dos Refugiados
            </h1>

            <p>
              Acolhemos quem chega ao Brasil, garantindo abrigo, alimentação
              e cuidados básicos.
            </p>

            <p style={{ marginTop: "15px" }}>
              Facilitamos documentação, oferecemos apoio psicológico e cursos
              de língua e capacitação profissional.
            </p>

            <p style={{ marginTop: "15px", fontWeight: "bold" }}>
              Com sua ajuda, transformamos acolhimento em novas oportunidades.
              Junte‑se a nós!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
