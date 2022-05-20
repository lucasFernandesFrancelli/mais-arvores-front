import Footer from "../../Components/Footer";
import carrossel from "./assets/carrossel.png";
import planta from "./assets/planta.png";
import mao from "./assets/mao.jpg";

import "./layout/index.css";
import { useEffect, useContext } from "react";
import { AuthContext } from "./../../contexts/auth";

function Home() {
  useEffect(() => {
    document.querySelector("#items").addEventListener("wheel", (event) => {
      if (event.deltaY > 0) {
        event.target.scrollBy(300, 0);
      } else {
        event.target.scrollBy(-300, 0);
      }
    });
  }, []);

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <div className="logout">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div id="items-wrapper">
        <div id="items">
          <div className="item">
            <img src={carrossel} />
          </div>
          <div className="item">
            <img src={mao} />
          </div>

          <div className="navigation-auto">
            <div className="auto-btn1"></div>
            <div className="auto-btn2"></div>
            <div className="auto-btn3"></div>
          </div>
        </div>
      </div>
      <section className="meio">
        <div className="sobre">
          <h3>SOBRE NÓS</h3>

          <p>
            O projeto Mais Árvores consiste em ajudar os habitantes a deixar
            suas casas, espaços de lazer e a cidade de Indaiatuba mais
            arborizada e verde, com o intuito de diminuir muitos dos problemas
            causados pela poluição atmosférica; já que ajudam a reduzir a
            temperatura do ambiente e melhoram a umidade relativa do ar pela
            evapotranspiração, evitam a erosão do solo e fornecem abrigo e
            comida a diversos seres vivos incluindo nós, seres humanos.
          </p>
        </div>

        <div className="plantaMeio">
          <img src={planta} alt="Cuidamos das arvores" />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
