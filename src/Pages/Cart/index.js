import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { useAuth } from "../../contexts/auth";
import { useCart } from "../../contexts/cart";
import "./styles.css";

export function Cart() {
  const { productList, total, removeProduct } = useCart();
  const navigate = useNavigate();
  const { hasDetail } = useAuth();

  function redirectToPurchase() {
    // verifica se tem detalhes
    console.log(hasDetail);
    if (!hasDetail) {
      navigate("/user-detail");
    } else {
      navigate("/purchase");
    }
  }

  return (
    <div>
      <Header />
      <main className="cart">
        <h1>Confira o carrinho</h1>
        <section className="cart_info">
          <span>
            Total: &nbsp;
            {Number(total).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>

          <button onClick={redirectToPurchase} disabled={Number(total) <= 0}>
            Prosseguir com a compra
          </button>
        </section>
        <section className="cart_list">
          <ul>
            {productList.map((product) => (
              <li key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    // src={
                    //   "http://localhost:4000/products/download/" + product.image
                    // }
                    alt={product.description}
                  />
                </Link>

                <div className="cart_list_detail">
                  <span>{product.description}</span>
                  <span>
                    {Number(product.price).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
                <p>Quantidade: {product.quantity}</p>
                <button onClick={() => removeProduct(product)}>Remover</button>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
