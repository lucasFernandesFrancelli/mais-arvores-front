import React, { useState } from "react";
import "./styles.css";
import { Header } from "../../Components/Header";
import Footer from "../../Components/Footer";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export function UserDetail() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCpf] = useState("");
  const [street, setStreet] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [complement, setComplement] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [number, setNumber] = useState();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    api
      .post("/users-detail/", {
        firstName,
        lastName,
        cpf,
        street,
        birthdate,
        neighborhood,
        complement,
        zipCode,
        city,
        state,
        number
      })
      .then(() => {
        toast.success("Cadastro realizado com sucesso");
        navigate("/");
      })
      .catch(error => {
        toast.error("Falha ao se cadastrar");
        console.log(error);
      });
  }

  return (
    <div>
      <Header />
      <form className="teste" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <label>
              Nome do usuário
              <input
                type="text"
                placeholder="Nome"
                onChange={e => setFirstName(e.target.value)}
              />
            </label>
            <label>
              Sobremome
              <input
                type="text"
                placeholder="Sobrenome"
                onChange={e => setLastName(e.target.value)}
              />
            </label>
            <label>
              Data de nascimento
              <input
                type="date"
                placeholder="Data"
                onChange={e => setBirthdate(e.target.value)}
              />
            </label>
            <label>
              CPF
              <input
                type="text"
                placeholder="CPF"
                onChange={e => setCpf(e.target.value)}
              />
            </label>
            <label>
              CEP
              <input
                type="text"
                placeholder="CEP"
                onChange={e => setZipCode(e.target.value)}
              />
            </label>
            <label>
              Complemento
              <input
                type="text"
                placeholder="Complemento"
                onChange={e => setComplement(e.target.value)}
              />
            </label>
          </div>

          <div className="col-md-6">
            <label>
              Estado
              <input
                type="text"
                placeholder="Estado"
                onChange={e => setState(e.target.value)}
              />
            </label>
            <label>
              Cidade
              <input
                type="text"
                placeholder="Cidade"
                onChange={e => setCity(e.target.value)}
              />
            </label>
            <label>
              Rua
              <input
                type="text"
                placeholder="Rua"
                onChange={e => setStreet(e.target.value)}
              />
            </label>
            <label>
              Bairro
              <input
                type="text"
                placeholder="Bairro"
                onChange={e => setNeighborhood(e.target.value)}
              />
            </label>
            <label>
              Número
              <input
                type="text"
                placeholder="Número"
                onChange={e => setNumber(e.target.value)}
              />
            </label>
          </div>

          <button classname="user-detail-button" type="submit">
            Cadastrar
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}
