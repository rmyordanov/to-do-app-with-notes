import styles from "./Login.module.css";

import { login, setUserData } from "../../api/data";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../api/api-firebase-config";

import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { updateUserNav } from "../../util";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const submitHandler = e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      if (email === "" || password === "" || !email.includes("@")) {
        throw new Error("Invaid input");
      }
      const loginUser = async () => {
        const result = await login(email, password);
        if (result) {
          onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            e.target.reset();
            setUserData(currentUser);
            updateUserNav();
            navigate("/");
          });
        } else {
          return;
        }
      };

      loginUser();
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    // <!--LOGIN-->
    <div className={styles["auth-form"]}>
      <h3 className={"form-title"}>LOGIN</h3>
      <form onSubmit={submitHandler} className={styles.login}>
        <input
          className={"add"}
          type="text"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={"add"}
          type="password"
          name="password"
          placeholder="Password"
        />
        <input
          className={`${"btn"} ${styles.loginBtn}`}
          type="submit"
          value="LOGIN"
        />
      </form>
    </div>
  );
};

export default Login;
