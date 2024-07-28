import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";

import Nav from "./components/Nav";
import HamburgerMenu from "./components/HamburgerMenu";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import Table from "./pages/Table";
import Reports from "./pages/Reports";
import All from "./pages/All";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    AOS.init();
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);

    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <Nav user={user} onLogout={handleLogout} />
      <HamburgerMenu />
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
        />
        {/* <Route
          path="/"
          element={user ? <Projects /> : <Navigate to="/login" />}
        /> 
        <Route
          path="/projects/:id"
          element={user ? <Project /> : <Navigate to="/login" />}
        /> */}
        <Route
          path="/"
          element={user ? <Project /> : <Navigate to="/login" />}
        />
        <Route
          path="/all"
          element={user ? <All /> : <Navigate to="/login" />}
        />
        <Route
          path="/table"
          element={user ? <Table /> : <Navigate to="/login" />}
        />
        <Route
          path="/reports"
          element={user ? <Reports /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
