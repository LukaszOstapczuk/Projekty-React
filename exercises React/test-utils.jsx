// import React from "react";
import { render } from "@testing-library/react";
import { AuthProvider } from "./src/context/authContext";
import { BrowserRouter } from "react-router-dom";

const AllTheProviders = ({ children }) => {
  return (
    <AuthProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </AuthProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
