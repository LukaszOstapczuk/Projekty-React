import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const availableUsers =
      JSON.parse(localStorage.getItem("availableUsers")) || [];
    const user = availableUsers.find((user) => user.username === username);

    if (user && user.password === password) {
      localStorage.setItem("user", username);
      localStorage.setItem("password", password);
      navigate("/dashboard");
    } else {
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
      }}
    >
      <h1>Logowanie</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Wpisz swoje imię"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          data-testid="login-username-input"
          required
        />
        <input
          type="password"
          placeholder="Wpisz swoje hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="login-password-input"
          required
        />
        <button type="submit" data-testid="login-submit">
          Zaloguj się
        </button>
      </form>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
      >
        <Alert onClose={() => setError(false)} severity="error">
          Niepoprawna nazwa użytkownika lub hasło
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignIn;
