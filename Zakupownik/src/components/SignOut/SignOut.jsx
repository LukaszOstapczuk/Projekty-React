import React from "react";
import "./SignOut.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "../SignIn/SignIn";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignOut = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateUsername = (input) => {
    const regex = /^[a-zA-Z]{3,}$/;
    return regex.test(input);
  };

  const validatePassword = (input) => {
    const regex = /^\S{3,}$/;
    return regex.test(input);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateUsername(username)) {
      setErrorMessage(
        "Imię musi mieć co najmniej 3 znaki i składać się wyłącznie z liter."
      );
      setError(true);
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage(
        "Hasło musi mieć co najmniej 3 znaki i nie może zawierać spacji."
      );
      setError(true);
      return;
    }

    const newUser = { username, password };
    let availableUsers =
      JSON.parse(localStorage.getItem("availableUsers")) || [];

    if (!availableUsers.find((user) => user.username === username)) {
      availableUsers.push(newUser);
      localStorage.setItem("availableUsers", JSON.stringify(availableUsers));
      localStorage.setItem("user", username);
      localStorage.setItem("password", password);
      navigate("/dashboard");
    } else {
      setErrorMessage("Użytkownik już istnieje");
      setError(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#61dafbaa",
      }}
    >
      <h1>Rejestracja</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Wpisz swoje imię"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Wpisz swoje hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Zarejestruj i zaloguj</button>
      </form>
      <SignIn />
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
      >
        <Alert onClose={() => setError(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignOut;
