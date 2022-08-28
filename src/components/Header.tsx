import { Row } from "antd";
import Logo from "../components/assets/logo.png";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.headerContainer}>
      <img className={styles.logo} src={Logo} alt="" />
    </header>
  );
}

export default Header;
