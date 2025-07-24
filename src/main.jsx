import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TodosProvider } from "./context/TodosContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <TodosProvider>
        <App />
      </TodosProvider>
    </AuthProvider>
  </StrictMode>
);
