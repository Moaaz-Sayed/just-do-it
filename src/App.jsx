import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Todos from "./pages/Todos";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import ReverseProtectedRoute from "./pages/ReverseProtectedRoute";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />

        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={
              <ReverseProtectedRoute>
                <Login />
              </ReverseProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ReverseProtectedRoute>
                <Signup />
              </ReverseProtectedRoute>
            }
          />
          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <Todos />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
