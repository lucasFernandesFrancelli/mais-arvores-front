import React from "react";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Header } from "../../Components/Header";
import Footer from "../../Components/Footer";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import "./styles.css";

export function Request() {
  const { id } = useParams();
  const [request, setRequest] = useState();

  useEffect(() => {
    api.get(`/request/${id}`).then(response => {
      setRequest(response.data);
    });
  }, []);

  if (!request) {
    return (
      <div>
        <Header />

        <section className="request_not-found">
          <p>Pedido não encontrado</p>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="request">
        <h1>Detalhes do pedido</h1>

        <section className="request_info">
          <p>
            Data do pedido: &nbsp;
            <strong>
              {request && dayjs(request.date).format("DD/MM/YYYY HH:mm")}
            </strong>
          </p>
          <p>
            Status do pedido: &nbsp;
            <strong>
              {request.requestStatus && request.requestStatus.description}
            </strong>
          </p>
          <p>
            Método de pagamento: &nbsp;
            <strong>
              {request.paymentMethod && request.paymentMethod.description}
            </strong>
          </p>
        </section>

        <section className="request_products">
          <ul>
            {request.products &&
              request.products.map(product => (
                <li key={product.product.id}>
                  <Link to={`/product/${product.product.id}`}>
                    <img
                      className="card-img-top"
                      src="https://images.unsplash.com/photo-1581441363689-1f3c3c414635?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470"
                      // src={
                      //   "https://mais-arvores-api.herokuapp.com/products/download/" +
                      //   product.image
                      // }
                      alt={product.description}
                    />
                  </Link>

                  <p>{product.product.description}</p>
                  <span>Preço: R$ {product.currentPrice}</span>
                  <span>Quantidade: {product.productQuantity}</span>
                </li>
              ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
