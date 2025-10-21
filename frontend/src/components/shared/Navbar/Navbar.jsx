import { Link } from "react-router";
import styles from "./Navbar.module.css"

function Navbar() {
  const brandStyle = {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1.5rem",
    display: "flex",
    alignItems: "center"
  }

  const brandTextStyle = {
    marginLeft: "0.5rem"
  }

  return (
    <nav className={`${styles.navbar} container`}>
      <Link to={"/"} style={brandStyle}>
        <img src="/images/logo.png" alt="Logo" width={48} />
        <span style={brandTextStyle}>ODIO</span>
      </Link>
    </nav>
  )
}

export default Navbar