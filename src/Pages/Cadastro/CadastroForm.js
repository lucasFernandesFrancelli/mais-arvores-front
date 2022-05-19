import React, { useState } from "react";
import "./layout/index.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import fundoDesfocado from "./assets/fundoDesfocado1.jpg";

const schema = yup.object({
  username: yup.string().required("O nome de usuário é obrigatório"),
  email: yup
    .string()
    .email("Deve ser informado um e-mail válido")
    .required("O E-mail é obrigatório"),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
      "A senha precisa ter no mínimo 8 caracteres, " +
        "uma letra maiúscula e uma letra minúscula, " +
        "um número"
    ),
});

const CadastroForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("submit", { username, email, password });
  };

  return (
    <div className="container">
      <h1 className="title">CADASTRO</h1>
      <div className="cadastro-form">
        <form onSubmit={handleSubmit}>
          <div className="cadastro-label">
            <label>
              Nome de usuário
              <div className="cadastro-input">
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="nomeDeUsuario"
                />
              </div>
              {/* <span>{errors.username?.message}</span> */}
            </label>
          </div>
          <div className="cadastro-label">
            <label>
              E-mail
              <div className="cadastro-input">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemplo.com"
                />
              </div>
              {/* <span>{errors.email?.message}</span> */}
            </label>
          </div>
          <div className="cadastro-label">
            <label>
              Senha
              <div className="cadastro-input">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                />
              </div>
              {/* {errors.password && (
            <span>
              *A senha precisa ter no mínimo 8 caracteres; <br /> *A senha
              precisa ter no mínimo uma letra maiúscula, <br />
              uma minúscula e um número
            </span>
          )} */}
            </label>
          </div>
          <div className="submit-button">
            <button type="submit">CADASTRAR-SE</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroForm;
