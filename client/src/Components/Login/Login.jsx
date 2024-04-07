import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    setEmailError("");
    setPasswordError("");
  }, [password, email]);

  const navigate = useNavigate();

  const onButtonClick = async () => {
    setEmailError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    const postData = {
      email: email,
      password: password,
    };

    const url = "http://localhost:3000/users/signin";
    console.log("try");
    try {
      const response = await axios.post(url, postData);
      console.log(response.data);
      navigate("/home");
    } catch (err) {
      console.log(err);
      const messageError = err.response.data.message;
      console.log(messageError);
      if (messageError === "Password is wrong") {
        setPasswordError("Password is wrong");
      } else if (messageError === "Email doesn't exists") {
        setEmailError("Email doesn't exists");
      } else if (messageError === "Email not verified") {
        setEmailError("Email not verified");
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div>Login</div>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={styles.inputBox}
        />
        <label className={styles.errorLabel}>{emailError}</label>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={styles.inputBox}
        />
        <label className={styles.errorLabel}>{passwordError}</label>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <input
          className={styles.inputButton}
          type="button"
          onClick={onButtonClick}
          value={"Log in"}
        />
      </div>
    </div>
  );
};

export default Login;
