import styles from "./Register.module.css";

import { register, setUserData } from "../../api/data";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../api/api-firebase-config";

import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { updateUserNav } from "../../util";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const submitHandler = e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");
    const repass = formData.get("repass");

    try {
      if (email === "" || password === "" || !email.includes("@")) {
        throw new Error("Invaid input");
      }
      if (password !== repass) {
        throw new Error("Passwords don't match");
      }
      register(email, password);

      onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        e.target.reset();
        setUserData(currentUser);
        updateUserNav();
        navigate("/");
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    // <!--LOGIN-->
    <div className={styles["auth-form"]}>
      <h3 className={"form-title"}>REGISTER</h3>
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
          className={"add"}
          type="password"
          name="repass"
          placeholder="Repeat Password"
        />
        <input
          className={`${"btn"} ${styles.loginBtn}`}
          type="submit"
          value="REGISTER"
        />
      </form>
    </div>
  );
};

export default Register;
