import React from "react";
import { api, getProducts } from "../../services/api";
import { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import "./styles.css";
import { Header } from "../../Components/Header";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import * as FaIcons from "react-icons/fa";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  const [busca, setBusca] = useState("");
  const filtroProd = products.filter((prod) =>
    prod.description.toLowerCase().startsWith(busca.toLowerCase())
  );

  useEffect(() => {
    (async () => {
      const response = await getProducts();
      setProducts(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div className="products_loading">Carregando dados</div>;
  }

  return (
    <div>
      <Header />
      <main className="products">
        <section className="products_header">
          <h1>Produtos</h1>

          {isAdmin === true && (
            <Link to="/create-product">Adicionar produto</Link>
          )}
        </section>
        <section className="products_header_search">
          <FaIcons.FaSearch id="lupa" />
          <input
            type="text"
            value={busca}
            onChange={(ev) => setBusca(ev.target.value)}
            placeholder="Informe o nome de um produto"
          />
        </section>

        <section className="products_list">
          <ul>
            {filtroProd.map((product) => (
              <li key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <img
                    className="card-img-top"
                    src={product.image}
                    alt={product.description}
                  />
                </Link>

                <p>{product.description}</p>
                <span>Preço: R$ {product.price}</span>
                <span>Categoria: {product.category.description}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
