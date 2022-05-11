import "./../index.css";
import logoCor from "./../Components/logocor.png";

const Header = () => {
  return (
    <div className="header-config">
      <div className="logo">
        <img src={logoCor}></img>
      </div>
      <nav>
        <ul className="header-links">
          <li>
            <a href="#">home</a>
            <a href="#">login</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
