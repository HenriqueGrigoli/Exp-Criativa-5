"use client";
import { useRouter } from "next/navigation";
import "./home.css"; // Importando o CSS específico

export default function Home() {
  const router = useRouter();

  return (
    <div className="home-container">
      {/* Cabeçalho */}
      <header className="header">
        <div className="iris-container">
          <span className="iris-title">IRIS</span>
          <span className="iris-subtitle">Integração de Refugiados e Inclusão Social</span>
        </div>

        <nav className="header-menu">
          <a href="#">Sobre a IRIS</a>
          <a href="#">O que fazemos</a>
          <a href="#">Ajude os refugiados</a>
        </nav>

        <div className="header-buttons">
          <button className="donate-button"
           onClick={() => router.push("/Doacoes")}
            >DOE AGORA</button>
        </div>
      </header>

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
          <img src="/Refugiado.jpg" alt="Refugiados em abrigo" />
        </div>
      </section>
    </div>
  );
}
