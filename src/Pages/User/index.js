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
        <h1>Meus Dados</h1>
        <section className="user_detail">
          <p>Nome de usuário: {user && user.username}</p>
          <p>E-mail: {user && user.email}</p>
        </section>
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
