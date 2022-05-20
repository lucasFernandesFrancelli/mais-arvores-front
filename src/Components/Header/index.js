import "./../../index.css";
import logoCor from "./../../Components/logocor.png";

const Header = () => {
  return (
    <div className="header-config">
      <div className="logo">
        <a href="/">
          <img src={logoCor}></img>
        </a>
      </div>
      <nav>
        <ul className="header-links">
          <li>
            <a href="/">home</a>
            <a href="/produtos">produtos</a>
            <a href="/login">login</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
