import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../Components/Header";
import { useAuth } from "../../contexts/auth";
import { api } from "../../services/api";
import "./styles.css";

export function User() {
  const { logout, userId } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
    api.get(`/users/${userId}`).then((response) => {
      setUser(response.data);
    });
    api.get(`/users-detail/${userId}`).then((response) => {
      setUserDetail(response.data);
    });
  }, []);

  return (
    <div>
      <Header />
      <main className="user">
        <div className="user_detail">
          <p>
            <h1>Meus Dados</h1>
            <strong>Nome de usuário:</strong> {user && user.username}
            <br />
            <strong>E-mail:</strong> {user && user.email}
            <br />
            <strong>Nome:</strong> {userDetail && userDetail.firstName}
            <br />
            <strong>Sobrenome:</strong> {userDetail && userDetail.lastName}
            <br />
            <br />
            <h1>Endereço</h1>
            <strong>Rua:</strong> {userDetail && userDetail.street}
            <br />
            <strong>Bairro:</strong> {userDetail && userDetail.neighborhood}
            <br />
            <strong>CEP:</strong> {userDetail && userDetail.zipCode}
            <br />
            <strong>Cidade:</strong> {userDetail && userDetail.city}
            <br />
            <strong>Estado:</strong> {userDetail && userDetail.state}
            <br />
          </p>
          <p></p>
        </div>
        <button onClick={logout} className="user_logout">
          logout
        </button>
        <Link className="user_edit" to={`/users/update/${userId}`}>
          Editar dados
        </Link>
      </main>
    </div>
  );
}
