src/
 ├─ context/
 │   └─ AuthContext.jsx
 ├─ services/
 │   └─ api.js
 ├─ components/
 │   ├─ Navbar.jsx
 │   ├─ Dashboard.jsx
 │   └─ Profile.jsx
 └─ App.jsx

 ----------------------------------- AuthContext.jsx ---------------------------------------------------------

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
// import { getCurrentUser } from "../services/api";

/**
 * Create Auth Context
 * This will hold global authentication state
 */
const AuthContext = createContext(null);

/**
 * Axios instance (can be moved to a separate api.js file)
 */
const api = axios.create({
  baseURL: "https://api.example.com",
  withCredentials: true,
});

/**
 * Auth Provider
 * - Fetches logged-in user from API
 * - Stores user globally
 * - Exposes auth state to entire app
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch current logged-in user
   */
  const fetchUser = async () => {
    try {
      const res = await api.get("/api/me");
      // const res = await getCurrentUser();
      setUser(res.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Run once when app loads
   */
  useEffect(() => {
    fetchUser();
  }, []);

  /**
   * Login handler
   */
  const login = async (credentials) => {
    const res = await api.post("/api/login", credentials);
    setUser(res.data.user);
    return res;
  };

  /**
   * Logout handler
   */
  const logout = async () => {
    await api.post("/api/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom Hook
 * Enforces usage inside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};






------------------------------------------- App.jsx ------------------------------------------------


import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Dashboard />
    </AuthProvider>
  );
}

export default App;


-------------------------------------------- Navbar.jsx ------------------------------------------

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return <h3>Welcome, {user?.name}</h3>;
};

export default Navbar;












