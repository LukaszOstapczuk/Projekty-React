import "./App.css";
import Paragraph from "./components/Paragraph/Paragraph";
import { Outlet } from "react-router-dom";
import AppWrapper from "./components/AppWrapper/AppWrapper";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";
function App() {
  return (
    <AppWrapper>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer>
        <Paragraph paragraphText="Zakupownik ver 2.1" />
      </Footer>
    </AppWrapper>
  );
}

export default App;
