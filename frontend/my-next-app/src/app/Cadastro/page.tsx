"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./cadastro.css";

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!nome || !email || !senha) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nome,
          email,
          senha
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Erro ao cadastrar usuário. Por favor, tente novamente.'
        );
      }

      setSuccess("Cadastro realizado com sucesso! Redirecionando...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ocorreu um erro desconhecido durante o cadastro.");
      }
      console.error('Erro no cadastro:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Cadastro</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleCadastro}>
          <div className="input-group">
            <label>Nome Completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Digite seu nome completo"
            />
          </div>

          <div className="input-group">
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite seu e-mail"
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="Crie uma senha segura"
              minLength={6}
            />
          </div>

          <button type="submit">Cadastrar</button>
        </form>

        <div className="links">
          <a href="/login">Já tem uma conta? Faça login</a>
        </div>
      </div>
    </div>
  );
}