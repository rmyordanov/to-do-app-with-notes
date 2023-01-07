import { Link } from "react-router-dom";
import { getUserData, logout } from "../../api/data";
import styles from "./Dropdown.module.css";

const Dropdown = props => {
  const userData = getUserData();
  return (
    <>
      {userData ? (
        <div
          onClick={() => props.click()}
          className={`${styles["dropdown-menu"]} user`}>
          <div className="close-btn">
            <Link>
              <label>X</label>
            </Link>
          </div>
          <span>Welcome Back, {userData.email}</span>
          <Link className="" to="create">
            Create
          </Link>
          <Link className="" to="my-tasks">
            My Tasks
          </Link>
          <Link
            onClick={() => {
              logout();
            }}
            className=""
            to="/">
            Logout
          </Link>
        </div>
      ) : (
        <div
          onClick={() => props.click()}
          className={`${styles["dropdown-menu"]} guest`}>
          <div className="close-btn">
            <Link>
              <label>X</label>
            </Link>
          </div>
          <Link className="" to="login">
            Login
          </Link>
          <Link className="" to="register">
            Register
          </Link>
        </div>
      )}
    </>
  );
};

export default Dropdown;
