import { getProducts } from "./../../services/api";
import { useEffect, useState } from "react";

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
    <div>
      <h1>Minha página de produtos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default Produto;
