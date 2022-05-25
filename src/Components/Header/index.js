import React from "react";
import { FaUser } from "react-icons/fa";

import "./index.css";
import { useAuth } from "../../contexts/auth";

export default function Navbar() {
  const { token } = useAuth();

  console.log(token);

  return (
    <header className="header">
      <div className="header_logo">
        <a href="/"></a>
      </div>
      <nav className="header_nav">
        <ul className="header_nav_ul">
          <li>
            <a href="/">Home</a>
          </li>
          {token && (
            <li>
              <a href="/products">Produtos</a>
            </li>
          )}
          <li>
            {token ? (
              <a href="/user">
                <FaUser />
              </a>
            ) : (
              <a href="/login">Login</a>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
