import React from "react";
import { FaCartPlus, FaUser } from "react-icons/fa";

import "./index.css";
import { useAuth } from "../../contexts/auth";
import { Link } from "react-router-dom";

export function Header() {
  const { token } = useAuth();

  return (
    <div>
      <header>
        <nav
          className="navbar navbar-expand-md fixed-top navbar-light"
          style={{ background: "#579200" }}
        >
          <div className="container-fluid">
            <Link className="navbar-brand text-white" to="/">
              Mais Árvores
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                {token && (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link active text-white"
                        to="/products"
                      >
                        Produtos
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link active text-white"
                        to="/requests"
                      >
                        Pedidos
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active text-white" to="/cart">
                        Carrinho
                      </Link>
                    </li>
                  </>
                )}
              </ul>

              <section className="d-flex">
                {token ? (
                  <Link
                    to="/user"
                    className="btn btn-outline-light"
                    type="submit"
                  >
                    <FaUser />
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="btn btn-outline-light"
                    type="submit"
                  >
                    Login
                  </Link>
                )}
              </section>
            </div>
          </div>
        </nav>
      </header>

      {/* <section className="p-5"></section> */}
    </div>

    // <header className="header">
    //   <div className="header_logo">
    //     <Link to="/"></Link>
    //   </div>

    //   <nav className="header_nav">
    //     <ul className="header_nav_ul">
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //       {token && (
    //         <>
    //           <li>
    //             <Link to="/products">Produtos</Link>
    //           </li>

    //           <li>
    //             <Link to="/requests">Pedidos</Link>
    //           </li>
    //         </>
    //       )}
    //       <li>
    //         {token ? (
    //           <Link to="/user">
    //             <FaUser />
    //           </Link>
    //         ) : (
    //           <Link to="/login">Login</Link>
    //         )}
    //       </li>
    //       <li>
    //         {token && (
    //           <Link to="/cart">
    //             <FaCartPlus />
    //           </Link>
    //         )}
    //       </li>
    //     </ul>
    //   </nav>
    // </header>
  );
}
