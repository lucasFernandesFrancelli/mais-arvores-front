import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../Components/Header";
import { useAuth } from "../../contexts/auth";
import { useCart } from "../../contexts/cart";
import { api } from "../../services/api";
import "./styles.css";

export function Product() {
  const { id } = useParams();
  const { addProduct, isProductInList } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { isAdmin } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/products/${id}`).then((response) => {
      const { data } = response;
      setProduct(data);
    });
  }, []);

  if (!product) {
    return (
      <div>
        <Header />

        <section className="product_not_found">
          <p>Produto não encontrado</p>
        </section>
      </div>
    );
  }

  function handleAddProductToCart() {
    addProduct({ ...product, quantity: Number(quantity) });
  }

  function handleDeleteProduct() {
    const confirm = window.confirm(
      "Tem certeza que deseja deletar este produto?"
    );

    if (!confirm) {
      return;
    }

    api
      .delete(`/products/${id}`)
      .then(() => {
        toast.success("Produto deletado com sucesso");
        navigate("/products");
      })
      .catch(() => {
        toast.error("Não foi possível deletar o produto");
      });
  }

  return (
    <>
      <Header />
      <main className="product">
        <img
          // src="https://images.unsplash.com/photo-1581441363689-1f3c3c414635?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470"
          src={product.image}
          // src={"http://localhost:4000/products/download/" + product.image}

          alt=""
        />
        <div className="product_detail">
          <h2>{product && product.description}</h2>
          <span>
            {product &&
              Number(product.price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
          </span>
          <input
            type="number"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            value={quantity}
            min="1"
          ></input>

          {isAdmin == true && (
            <Link
              className="product_detail_button"
              style={{ marginTop: 15, background: "blue" }}
              to={`/products/update/${product.id}`}
            >
              Editar produto
            </Link>
          )}
          {isAdmin == true ? (
            <button
              onClick={handleDeleteProduct}
              className="product_detail_button"
              style={{ marginTop: 15, background: "red" }}
            >
              Deletar produto
            </button>
          ) : product && !isProductInList(product.id) ? (
            <button
              onClick={handleAddProductToCart}
              disabled={Number(quantity) < 1}
              className="product_detail_button"
            >
              Adicionar ao carrinho
            </button>
          ) : (
            <Link to="/cart" className="product_detail_button_cart">
              Ver carrinho
            </Link>
          )}
        </div>
      </main>
    </>
  );
}
