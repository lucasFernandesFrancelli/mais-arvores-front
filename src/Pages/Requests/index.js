import React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth";
import { api } from "../../services/api";
import { Header } from "../../Components/Header";
import Footer from "../../Components/Footer";
import dayjs from "dayjs";
import "./styles.css";
import { Link } from "react-router-dom";

export function Requests() {
  const [requests, setRequests] = useState([]);
  const [requestStatus, setRequestStatus] = useState([]);
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (isAdmin === true) {
      api.get("/request").then((response) => {
        setRequests(response.data);
      });
    } else {
      api.get("/request/user").then((response) => {
        setRequests(response.data);
      });
    }
  }, []);

  useEffect(() => {
    api.get("request-status").then((response) => {
      setRequestStatus(response.data);
    });
  }, []);

  function handleRequestStatus(requestId, statusId) {
    api
      .put(`/request/${requestId}`, {
        requestStatus: {
          id: statusId,
        },
      })
      .then(() => {
        api
          .get(`/request/${isAdmin === true ? "" : "user"}`)
          .then((response) => {
            setRequests(response.data);
          });
      });
  }

  return (
    <div>
      <Header />

      <main className="requests">
        <h1>Histórico de pedidos</h1>

        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr className="bg-success text-white">
                <th scope="col">Data do pedido</th>
                <th scope="col">Método de pagamento</th>
                <th scope="col">Total</th>
                <th scope="col">Status do pedido</th>
                <th scope="col">Detalhes</th>
                {isAdmin === true && <th>Usuário</th>}
              </tr>
            </thead>
            <tbody>
              {requests
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((request) => (
                  <tr key={request.id}>
                    <td className="text-center">
                      {dayjs(request.date).format("DD/MM/YYYY HH:mm")}
                    </td>
                    <td className="text-center">
                      {request.paymentMethod.description}
                    </td>
                    <td className="text-center">
                      {request.total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="text-center">
                      {isAdmin === true ? (
                        <select
                          className="form-select"
                          onChange={(e) =>
                            handleRequestStatus(request.id, e.target.value)
                          }
                          value={request.requestStatus.description}
                          name="requestStatus"
                          id="requestStatus"
                        >
                          <option value={request.requestStatus.id}>
                            {request.requestStatus.description}
                          </option>
                          {requestStatus.map((status) => (
                            <option key={status.id} value={status.id}>
                              {status.description}
                            </option>
                          ))}
                        </select>
                      ) : (
                        request.requestStatus.description
                      )}
                    </td>
                    <td className="text-center">
                      <Link to={`/request/${request.id}`}>Ver mais</Link>
                    </td>
                    {isAdmin === true && (
                      <td className="text-center">{request.user.username}</td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
