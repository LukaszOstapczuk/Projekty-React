import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./index.css";
import DashboardContent from "./components/DashboardContent/DashboardContent.jsx";
import { useEffect } from "react";
import { ProductsProvider } from "./context/ProductsContext";
import SignOut from "./components/SignOut/SignOut.jsx";

const RedirectToDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);

  return null;
};

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    const password = localStorage.getItem("password");
    if (!user || !password) {
      navigate("/signOut");
    }
  }, [navigate]);

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectToDashboard />,
  },

  {
    path: "/signOut",
    element: <SignOut />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <DashboardContent />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductsProvider>
    <RouterProvider router={router} />
  </ProductsProvider>
);
