import "./Header.css";
import { useNavigate } from "react-router-dom";
import ProductFilters from "../zakupownik/ProductsFilters/ProductsFilters";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("password");
    navigate("/signOut");
  };

  return (
    <div
      style={{
        height: "100px", // wysokość 100px
        width: "100%", // szerokość 100%
        backgroundColor: "#f8d7da", // kolor tła
        display: "flex", // flexbox
        justifyContent: "center", // wyśrodkowanie w poziomie
        alignItems: "center", // wyśrodkowanie w pionie
        gap: "100px", // odstęp między elementami
      }}
    >
      <ProductFilters />
      <div>Jesteś zalogowany jako: {username}</div>
      <button onClick={handleLogout}>Wyloguj</button>
    </div>
  );
};

export default Header;
