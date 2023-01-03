import { useEffect } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { updateUserNav } from "../../util";
import { logout } from "../../api/data";

import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  useEffect(() => {
    updateUserNav();
  }, []);

  return (
    <header>
      <nav>
        <div>
          <Link className={styles.logo} to="/">
            <img
              src={process.env.PUBLIC_URL + "/images/todologo.webp"}
              alt="logo"
            />
          </Link>
        </div>
        <div className={`guest ${styles.guest}`}>
          <Link className={styles.li} to="login">
            Login
          </Link>
          <Link className={styles.li} to="register">
            Register
          </Link>
        </div>
        <div className={`user ${styles.user}`}>
          <li className={`welcome-msg ${styles["welcome-msg"]}`}>
            <span></span>
          </li>
          <Link className={styles.li} to="create">
            Create Task
          </Link>
          <Link className={styles.li} to="my-tasks">
            My Tasks
          </Link>
          <li>
            <a
              onClick={() => {
                logout();
                updateUserNav();
                navigate("/");
              }}
              href="#">
              Logout
            </a>
          </li>
        </div>
      </nav>
    </header>
  );
};

export default Header;
