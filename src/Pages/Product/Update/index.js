import React, { useEffect } from "react";
import { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router";
import { useAuth } from "../../../contexts/auth";
import { api } from "../../../services/api";
import { Header } from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export function UpdateProduct() {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInput = React.createRef();
  const { isAdmin } = useAuth();
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    console.log(id);
    api
      .get(`/products/${id}`)
      .then((response) => {
        setPrice(response.data.price);
        setDescription(response.data.description);
        setSelectedCategory(response.data.category.description);
      })
      .catch(() => {
        toast.error("Produto não encontrado");
        navigate("/products");
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    api
      .put(`/products/${id}`, {
        description,
        price,
        category: { id: selectedCategory },
      })
      .then((response) => {
        toast.success("Produto atualizado com sucesso");

        const formData = new FormData();
        formData.append("product", fileInput.current.files[0]);

        api.post(`/products/${id}/images/upload`, formData);

        navigate("/");
      })
      .catch((err) => {
        const errorMessage = String(
          err.response.data.message
        ).toLocaleLowerCase();
        if (errorMessage.includes("product")) {
          toast.error("Produto já cadastrado");
        } else {
          toast.error("Erro no servidor");
        }
      });
  }

  return (
    <div>
      <Header />
      <div className="cadastro-form">
        <form onSubmit={handleSubmit}>
          <h1>CADASTRO DE PRODUTOS</h1>
          <div className="cadastro-label">
            <label>
              Nome do produto
              <div className="cadastro-input">
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="cadastro-label">
            <label>
              Preço
              <div className="cadastro-input">
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="cadastro-label">
            <label for="category">Categoria</label>
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
              name="category"
              id="category"
            >
              <option>Categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.description}
                </option>
              ))}
            </select>
          </div>
          <div className="cadastro-label-image">
            <input
              type="file"
              // value={selectedFile}
              // onChange={(e) => setSelectedFile(e.target.files[0])}
              ref={fileInput}
            />
          </div>

          <div className="button-criar">
            <button type="submit">Atualizar</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
