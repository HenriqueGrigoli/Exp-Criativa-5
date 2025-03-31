"use client";
import { useRouter } from "next/navigation";
import "./home.css"; // Importando o CSS específico
import Layout from "./Componentes/layout";

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Sobre a IRIS</h1>
            <p className="hero-subtitle">
              A IRIS é uma ONG dedicada a conectar voluntários a refugiados, 
              promovendo acolhimento, apoio e integração. Facilitamos doações financeiras e de bens essenciais,
              garantindo que a ajuda chegue a quem mais precisa. 
              Nosso principal objetivo é construir uma rede de suporte eficiente e solidária, 
              proporcionando dignidade e novas oportunidades para aqueles que buscam recomeçar.
            </p>
            <div className="hero-buttons">
              <button className="primary-button">Saiba mais</button>
              <button 
                className="secondary-button" 
                onClick={() => router.push("/Login")}
              >
                ABRIGUE UMA FAMÍLIA
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src="imigrantes.jpeg" alt="Refugiados em abrigo" />
          </div>
        </section>
      </div>
    </Layout>
  );
}
