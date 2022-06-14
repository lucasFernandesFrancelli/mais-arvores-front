import React, { useEffect } from "react";
import { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router";
import { useAuth } from "../../../contexts/auth";
import { api } from "../../../services/api";

export function CreateProduct() {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { isAdmin } = useAuth();

  // const [image, _setImage] = useState("");

  // const imgFunction = (event) => {
  //   setImage(event.target.value);
  //   const reader = new FileReader();
  //   reader.onload = function () {
  //     const output = document.getElementById("output");
  //     output.src = reader.result;
  //   };
  //   reader.readAsDataURL(event.target.files[0]);
  // };

  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin == false) {
      navigate("/");
    }
    api.get("/categories").then(response => {
      setSelectedCategory(response.data);
      console.log(response);
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
  };

  // const loggedInAdm = useSelector(state => state.loggedInAdm)

  return (
    <div>
      <div className="cadastro-form">
        <form onSubmit={handleSubmit}>
          <h1>CADASTRO DE PRODUTOS</h1>
          <div className="cadastro-labelp">
            <label>
              Nome do produto
              <div className="cadastro-input">
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="cadastro-labelp">
            <label>
              Preço
              <div className="cadastro-input">
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
            </label>
          </div>
          <label for="category">Categoria</label>
          <select
            onChange={e => setSelectedCategory(e.target.value)}
            value={selectedCategory.description}
            name="category"
            id="category"
          >
            <option value="0">Categoria</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.description}
              </option>
            ))}
          </select>
          {/* {image != null && image != "" ? (
            <div className="id_img">
              <img
                id="output"
                style={{
                  minHeight: "200px",
                  minWidth: "200px",
                  maxHeight: "200px",
                  maxWidth: "200px",
                  border: "0px"
                }}
              />
            </div>
          ) : null} */}
          {/* <div className="cadastro-labelp">
            <label>
              <div>
                <input
                  type="file"
                  name="image"
                  id="image"
                  value={image}
                  onChange={(e) => imgFunction(e)}
                  placeholder="image"
                  hidden
                />
                <label for="image" id="Up_img_label">
                  <FaIcons.FaUpload id="icon_upload" />
                </label>
              </div>
            </label>
          </div> */}
          <div className="button-criar">
            <button type="submit">CRIAR</button>
          </div>
        </form>
      </div>
    </div>
  );
}
