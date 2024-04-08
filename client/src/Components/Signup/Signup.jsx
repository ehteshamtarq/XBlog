import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Signup.module.css"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [dobError, setDobError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    setEmailError("");
    setDobError("");
    setNameError("");
    setPasswordError("");
  }, [name, password, dob, email]);

  const onButtonClick = async () => {
    setButtonDisabled(true);
    if ("" === email) {
      setEmailError("Please enter your email");
      setButtonDisabled(false);
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      setButtonDisabled(false);

      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      setButtonDisabled(false);

      return;
    }

    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer");
      setButtonDisabled(false);

      return;
    }

    if (!name) {
      setNameError("Please enter your name");
      setButtonDisabled(false);

      return;
    }

    if (!isNaN(name)) {
      setNameError("Cannot be a number");
      setButtonDisabled(false);
    }

    if (!dob) {
      setDobError("DOB cannot be empty");
      setButtonDisabled(false);

      return;
    }

    const dateofbirth = new Date(dob);
    const today = new Date();
    if (dateofbirth > today) {
      setDobError("DOB cannot be greater than today's date.");
      setButtonDisabled(false);
    }

    const postData = {
      name: name,
      email: email,
      password: password,
      dateOfBirth: dob,
    };

    const url = "http://localhost:3000/users/signup";

    try {
      const response = await axios.post(url, postData);
      console.log(response.data);
      navigate('/login')
      setButtonDisabled(false);
    } catch (err) {
      console.log(err);
      const messageError = err.response.data.message;
      console.log(messageError === "Email already exists");

      if (messageError === "Email already exists") {
        console.log("inside");
        setEmailError("Email already exists");
      }else{
        navigate("/error")
      }

      setButtonDisabled(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div>Signup</div>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <input
          value={name}
          placeholder="name"
          onChange={(ev) => setName(ev.target.value)}
          className={styles.inputBox}
        />
        <label className={styles.errorLabel}>{nameError}</label>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <input
          value={email}
          placeholder="Email"
          onChange={(ev) => setEmail(ev.target.value)}
          className={styles.inputBox}
        />
        <label className={styles.errorLabel}>{emailError}</label>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <input
          value={password}
          placeholder="password"
          type="password"
          onChange={(ev) => setPassword(ev.target.value)}
          className={styles.inputBox}
        />
        <label className={styles.errorLabel}>{passwordError}</label>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <input
          value={dob}
          type="date"
          placeholder="date of birth"
          onChange={(ev) => setDob(ev.target.value)}
          className={styles.inputBox}
        />
        <label className={styles.errorLabel}>{dobError}</label>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <input
          className={styles.inputButton}
          type="button"
          onClick={onButtonClick}
          value={buttonDisabled ? "loading" : "Sign Up"}
          disabled={buttonDisabled}
        />
      </div>
    </div>
  );
};

export default Signup;
