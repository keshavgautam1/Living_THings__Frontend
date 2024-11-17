import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<AuthPage setAuthenticated={setAuthenticated} />}
        />
        <Route
          path="/dashboard"
          element={
            authenticated ? (
              <Dashboard setAuthenticated={setAuthenticated} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
