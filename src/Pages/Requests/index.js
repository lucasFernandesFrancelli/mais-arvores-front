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

  useEffect(() => {
    api.get("/request/user").then((response) => {
      setRequests(response.data);
    });
  }, []);

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
                <td>{request.requestStatus.description}</td>
                <td>
                  <Link to={`/request/${request.id}`}>Ver mais</Link>
                </td>
              </tr>
            ))}
        </table>
      </main>
      <Footer />
    </div>
  );
}
