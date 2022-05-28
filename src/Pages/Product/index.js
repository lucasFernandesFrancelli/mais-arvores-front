import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../Components/Header";
import { api } from "../../services/api";
import "./styles.css";

export function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    api.get(`/products/${id}`).then((response) => {
      const { data } = response;
      setProduct(data);
    });
  }, []);

  return (
    <>
      <Header />
      <main className="product">
        <img src="https://images.unsplash.com/photo-1581441363689-1f3c3c414635?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470" />
        <div className="product_detail">
          <h2>{product?.description}</h2>
          <span>
            {Number(product?.price).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <input
            type="number"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          ></input>
          <button className="product_detail_button">
            Adicionar ao carrinho
          </button>
        </div>
      </main>
    </>
  );
}
