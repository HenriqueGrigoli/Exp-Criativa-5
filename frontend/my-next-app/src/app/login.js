import { useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/login.css"; // Importando o CSS específico

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulação de login (substituir por uma API real)
    if (email === "teste@email.com" && password === "123456") {
      router.push("/dashboard"); // Redireciona após login
    } else {
      setError("E-mail ou senha inválidos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin}>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Digite sua senha"
            />
          </div>

          <button type="submit">Entrar</button>
        </form>

        <div className="links">
          <a href="/forgot-password">Esqueci minha senha</a>
          <a href="/register">Cadastre-se</a>
        </div>
      </div>
    </div>
  );
}
