import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import bem_vindo from "./assets/bem_vindo.png";
import "./layout/index.css";

const LoginForm = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <div className="container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="form-bg">
            <img src={bem_vindo} />
          </div>
          <div className="login-label">
            <label>
              E-mail
              <div className="login-input">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="login-label">
            <label>
              Senha
              <div className="login-input">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="submit-button">
            <button type="submit">ENTRAR</button>
          </div>

          <span className="text1">
            Não possui uma conta? <a href="/cadastro">Cadastre-se aqui!</a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
