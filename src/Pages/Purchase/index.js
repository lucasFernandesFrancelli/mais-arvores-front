import React from "react";
import "./styles.css";
import { Header } from "../../Components/Header";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useCart } from "../../contexts/cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

export function Purchase() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { productList, total } = useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const { userId } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
    api.get("/payment-method").then(response => {
      setPaymentMethods(response.data);
      console.log(response);
    });
    api.get(`/users-detail/${userId}`).then(response => {
      setUserDetail(response.data);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const body = {
      paymentMethod: { id: selectedPaymentMethod },
      deliveryRate: 0,
      total,
      products: productList.map(product => ({
        ...product,
        productQuantity: product.quantity,
        currentPrice: product.price,
        product: { id: product.id },
        id: undefined
      }))
    };

    console.log(body);

    api
      .post("/request", body)
      .then(() => {
        toast.success("Pedido realizado com sucesso");
        navigate("/");
      })
      .catch(error => {
        toast.error("Falha ao realizar compra");
        console.error(error);
      });
  }

  return (
    <div>
      <Header />
      <main className="purchase">
        <form onSubmit={handleSubmit} className="purchase_form">
          <h1>Finalizar Compra</h1>
          <div className="purchase_form_input_group">
            <label for="paymentMethod">Método de Pagamento</label>
            <select
              onChange={e => setSelectedPaymentMethod(e.target.value)}
              value={selectedPaymentMethod}
              name="paymentMethod"
              id="paymentMethod"
            >
              <option value="0">Método de pagamento</option>
              {paymentMethods.map(paymentMethod => (
                <option key={paymentMethod.id} value={paymentMethod.id}>
                  {paymentMethod.description}
                </option>
              ))}
            </select>
            <h4>Endereço de entrega</h4>
            <p>Rua: {userDetail && userDetail.street}</p>
            <p>Bairro: {userDetail && userDetail.neighborhood}</p>
            <p>CEP: {userDetail && userDetail.zipCode}</p>
            <p>Cidade: {userDetail && userDetail.city}</p>
            <p>Estado: {userDetail && userDetail.state}</p>
          </div>
          <div className="purchase_form_action">
            <h2>
              Total:
              {Number(total).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </h2>
            <button type="submit">Finalizar compra</button>
          </div>
        </form>
      </main>
    </div>
  );
}
