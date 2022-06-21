import React, { useState } from "react";
import "./styles.css";
import { Header } from "../../Components/Header";
import Footer from "../../Components/Footer";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/auth";
import { IMaskInput } from "react-imask";

export function UserDetail() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCpf] = useState("");
  const [street, setStreet] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [complement, setComplement] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState(null);
  const [number, setNumber] = useState();
  const navigate = useNavigate();

  const { setHasDetail } = useAuth();

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
        number,
      })
      .then(() => {
        toast.success("Cadastro realizado com sucesso");

        setHasDetail(true);

        navigate("/");
      })
      .catch((error) => {
        toast.error("Falha ao se cadastrar");
        console.log(error);
      });
  }

  function checkCEP(e) {
    const cep = e.target.value.replace(/[^0-9]/g, "");

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        const response = data;
        if (response && response.hasOwnProperty("erro")) {
          console.log("error");
          toast.error("Informe um CEP válido");
        }
        setStreet(data.logradouro);
        setCity(data.localidade);
        setState(data.uf);
        setNeighborhood(data.bairro);
      })
      .catch(() => {
        toast.error("Falha ao buscar o CEP informado");
      });
  }

  return (
    <div>
      <Header />

      <div className="user_detail">
        <form className="user_detail_form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <label>
                Nome do usuário:
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nome"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label>
                Sobremome
                <input
                  className="form-control"
                  type="text"
                  placeholder="Sobrenome"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label>
                Data de nascimento
                <input
                  className="form-control"
                  type="date"
                  placeholder="Data"
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </label>
              <label>
                CPF
                <IMaskInput
                  mask="000.000.000-00"
                  className="form-control"
                  type="text"
                  placeholder="CPF"
                  onChange={(e) => setCpf(e.target.value)}
                />
              </label>
              <label>
                CEP
                <IMaskInput
                  mask="00.000-000"
                  className="form-control"
                  type="text"
                  placeholder="CEP"
                  onBlur={checkCEP}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </label>
              <label>
                Complemento
                <input
                  className="form-control"
                  type="text"
                  placeholder="Complemento"
                  onChange={(e) => setComplement(e.target.value)}
                />
              </label>
            </div>

            <div className="col-md-6">
              <label>
                Estado
                <select
                  className="form-control"
                  id="UF"
                  name="UF"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                >
                  <option value="">Selecione</option>
                  <option value="AC">AC</option>
                  <option value="AL">AL</option>
                  <option value="AP">AP</option>
                  <option value="AM">AM</option>
                  <option value="BA">BA</option>
                  <option value="CE">CE</option>
                  <option value="DF">DF</option>
                  <option value="ES">ES</option>
                  <option value="GO">GO</option>
                  <option value="MA">MA</option>
                  <option value="MS">MS</option>
                  <option value="MT">MT</option>
                  <option value="MG">MG</option>
                  <option value="PA">PA</option>
                  <option value="PB">PB</option>
                  <option value="PR">PR</option>
                  <option value="PE">PE</option>
                  <option value="PI">PI</option>
                  <option value="RJ">RJ</option>
                  <option value="RN">RN</option>
                  <option value="RS">RS</option>
                  <option value="RO">RO</option>
                  <option value="RR">RR</option>
                  <option value="SC">SC</option>
                  <option value="SP">SP</option>
                  <option value="SE">SE</option>
                  <option value="TO">TO</option>
                </select>
              </label>
              <label>
                Cidade
                <input
                  className="form-control"
                  type="text"
                  placeholder="Cidade"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                />
              </label>
              <label>
                Rua:
                <input
                  className="form-control"
                  type="text"
                  placeholder="Rua"
                  onChange={(e) => setStreet(e.target.value)}
                  value={street}
                />
              </label>
              <label>
                Bairro
                <input
                  className="form-control"
                  type="text"
                  placeholder="Bairro"
                  onChange={(e) => setNeighborhood(e.target.value)}
                  value={neighborhood}
                />
              </label>
              <label>
                Número
                <input
                  className="form-control"
                  type="text"
                  placeholder="Número"
                  onChange={(e) => setNumber(e.target.value)}
                />
              </label>
              <button type="submit">Cadastrar</button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
