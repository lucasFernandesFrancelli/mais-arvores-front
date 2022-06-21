import React, { useEffect, useState } from "react";
import "./styles.css";
import { api } from "../../../services/api";
import { useAuth } from "../../../contexts/auth";
import { Header } from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export function UpdateUserDetail() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCpf] = useState("");
  const [street, setStreet] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [complement, setComplement] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [number, setNumber] = useState();
  const navigate = useNavigate();

  const { setHasDetail } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/users-detail/${id}`)
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setCpf(response.data.cpf);
        setStreet(response.data.street);
        setBirthdate(dayjs(response.data.birthdate).format("YYYY-MM-DD"));
        setNeighborhood(response.data.neighborhood);
        setComplement(response.data.complement);
        setZipCode(response.data.zipCode);
        setCity(response.data.city);
        setState(response.data.state);
        setNumber(response.data.number);
        console.log(birthdate);
      })
      .catch(() => {
        toast.error("Este usuário não possui detalhe");
        navigate(`/user-detail`);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    api
      .put(`/users-detail/${id}`, {
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
        toast.success("Cadastro atualizado com sucesso");

        setHasDetail(true);

        navigate("/");
      })
      .catch((error) => {
        toast.error("Falha ao se cadastrar");
        console.log(error);
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
                Nome do usuário
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nome"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label>
                Sobremome
                <input
                  className="form-control"
                  type="text"
                  placeholder="Sobrenome"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label>
                Data de nascimento
                <input
                  className="form-control"
                  type="date"
                  placeholder="Data"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </label>
              <label>
                CPF
                <input
                  className="form-control"
                  type="text"
                  placeholder="CPF"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </label>
              <label>
                CEP
                <input
                  className="form-control"
                  type="text"
                  placeholder="CEP"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </label>
              <label>
                Complemento
                <input
                  className="form-control"
                  type="text"
                  placeholder="Complemento"
                  value={complement}
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
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </label>
              <label>
                Rua
                <input
                  className="form-control"
                  type="text"
                  placeholder="Rua"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </label>
              <label>
                Bairro
                <input
                  className="form-control"
                  type="text"
                  placeholder="Bairro"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                />
              </label>
              <label>
                Número
                <input
                  className="form-control"
                  type="text"
                  placeholder="Número"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </label>
              <button type="submit">Atualizar</button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
