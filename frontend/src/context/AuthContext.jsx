import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // site password gate
  const [siteUnlocked, setSiteUnlocked] = useState(() => sessionStorage.getItem("site-unlocked") === "1");
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(() => sessionStorage.getItem("disclaimer-accepted") === "1");

  // admin auth
  const [token, setToken] = useState(() => localStorage.getItem("admin-token") || null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    if (!token) { setAdmin(null); return; }
    axios.get(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => setAdmin(r.data))
      .catch(() => { setToken(null); localStorage.removeItem("admin-token"); });
  }, [token]);

  const verifySitePassword = async (password) => {
    await axios.post(`${API}/site/verify-password`, { password });
    sessionStorage.setItem("site-unlocked", "1");
    setSiteUnlocked(true);
  };

  const acceptDisclaimer = () => {
    sessionStorage.setItem("disclaimer-accepted", "1");
    setDisclaimerAccepted(true);
  };

  const login = async (email, password) => {
    const { data } = await axios.post(`${API}/auth/login`, { email, password });
    localStorage.setItem("admin-token", data.token);
    setToken(data.token);
    setAdmin(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("admin-token");
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{
      siteUnlocked, verifySitePassword,
      disclaimerAccepted, acceptDisclaimer,
      token, admin, login, logout, API,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
