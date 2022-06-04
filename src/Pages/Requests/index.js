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
    api.get(`/request/${isAdmin ? "" : "user"}`).then((response) => {
      setRequests(response.data);
    });
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
        api.get(`/request/${isAdmin ? "" : "user"}`).then((response) => {
          setRequests(response.data);
        });
      });
  }

  return (
    <div>
      <Header />
      <main className="requests">
        <h1>Histórico de pedidos</h1>

        <table className="requests_table">
          <tr>
            <th>Data do pedido</th>
            <th>Método de pagamento</th>
            <th>Total</th>
            <th>Status do pedido</th>
            <th>Detalhes</th>
            {isAdmin ? <th>Usuário</th> : ""}
          </tr>
          {requests
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((request) => (
              <tr key={request.id}>
                <td>{dayjs(request.date).format("DD/MM/YYYY HH:mm")}</td>
                <td>{request.paymentMethod.description}</td>
                <td>
                  {request.total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>
                  {isAdmin ? (
                    <select
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
                <td>
                  <Link to={`/request/${request.id}`}>Ver mais</Link>
                </td>
                <td>{isAdmin ? request.user.username : ""}</td>
              </tr>
            ))}
        </table>
      </main>
      <Footer />
    </div>
  );
}
