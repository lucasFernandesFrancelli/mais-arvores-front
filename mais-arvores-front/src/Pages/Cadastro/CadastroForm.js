import React from "react";
import "./layout/index.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function cadastrarUsuario(data) {
    console.log(data);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(cadastrarUsuario)}>
        <label>
          Nome de usuário
          <input
            type="text"
            placeholder="nomeDeUsuario"
            {...register("username", { required: true })}
          />
          <span>{errors.username?.message}</span>
        </label>
        <label>
          E-mail
          <input
            type="email"
            placeholder="exemplo@email.com"
            {...register("email", { required: true })}
          />
          <span>{errors.email?.message}</span>
        </label>
        <label>
          Senha
          <input
            type="password"
            placeholder="mín. 8 caractéres"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span>
              *A senha precisa ter no mínimo 8 caracteres; <br /> *A senha
              precisa ter no mínimo uma letra maiúscula, <br />
              uma minúscula e um número
            </span>
          )}
        </label>
        <div className="submit-button">
          <button type="submit">CADASTRAR-SE</button>
        </div>
      </form>
    </div>
  );
};

export default CadastroForm;
