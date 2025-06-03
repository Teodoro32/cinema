import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className="mb-0">
          © 2025 Gabriel Teodoro - Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}

export default Footer;
