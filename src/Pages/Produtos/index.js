import { getProducts, getProductsImage } from "./../../services/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./layout/index.css";

function Produto() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getProducts();
      setProducts(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div className="loading">Carregando dados</div>;
  }

  return (
    <>
      <h1>Produtos</h1>
      <div className="produtos">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img
              style={{ width: 150 }}
              className="card-img-top"
              src={
                "https://mais-arvores-api.herokuapp.com/products/download/" +
                product.image
              }
            />
            <div className="card-body">
              <h4 className="card-title">{product.description}</h4>
              <p className="card-text">Preço: R$ {product.price}</p>
              <p className="card-text">
                Categoria: {product.category.description}
              </p>

              <button type="button" className="btn btn-primary">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Produto;
