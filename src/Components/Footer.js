import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-config">
      <span>
        © {new Date().getFullYear()} Mais Árvores. Todos os direitos reservados.
      </span>
    </div>
  );
};

export default Footer;
