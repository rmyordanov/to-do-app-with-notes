import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { updateUserNav } from "../../util";
import { getUserData, logout } from "../../api/data";

import styles from "./Header.module.css";
import Dropdown from "./Dropdown";

import { CgMenuRight } from "react-icons/cg";

const Header = () => {
  const userData = getUserData();
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  // useEffect(() => {
  //   // updateUserNav();
  //   const click = (e) => {
  //     if(e.target.className === 'menu-trigger'){
  //       setIsOpenMenu(!isOpenMenu);
  //     }else{
  //       setIsOpenMenu(false);
  //     }
  //   }
  // });

  const clickHandler = () => {
    setIsOpenMenu(!isOpenMenu);
  };

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

        <div className={styles["desktop-navbar"]}>
          {userData ? (
            <div className={`user ${styles.user}`}>
              <li className={`welcome-msg ${styles["welcome-msg"]}`}>
                <span>Welcome Back, {userData.email}</span>
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
                    // updateUserNav();
                    navigate("/");
                  }}
                  href="#">
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className={`guest ${styles.guest}`}>
              <Link className={styles.li} to="login">
                Login
              </Link>
              <Link className={styles.li} to="register">
                Register
              </Link>
            </div>
          )}
        </div>
        <div className={styles["mobile-menu"]}>
          <div className={styles["menu-trigger"]}>
            <CgMenuRight
              onClick={() => setIsOpenMenu(!isOpenMenu)}
              size={50}
              className={`${styles["menu-icon"]} cursor-pointer`}
            />
          </div>
          <div
            className={`${styles["dropdowm-menu"]} ${
              isOpenMenu ? `${styles.active}` : `${styles.inactive}`
            }`}>
            <Dropdown click={clickHandler} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
