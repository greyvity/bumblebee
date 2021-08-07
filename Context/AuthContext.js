import { useContext, createContext, useState, useEffect } from "react";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  const getToken = () => {
    let token = localStorage.getItem("authToken");
    if (token) return token;
    else return;
  };

  // refresh token
  const refreshToken = async () => {
    if (sessionExpired) {
      const config = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: currentUser.refresh }),
      };
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/auth/login/refresh`,
          config
        );
        console.log(res);
        const jsonRes = await res.json();
        console.log(jsonRes);
      } catch (err) {}
    }
  };

  // Log user out
  const logout = async () => {
    if (currentUser) {
      const config = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: currentUser.refresh }),
      };
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/auth/logout/`,
          config
        );
        console.log(res);
        const jsonRes = await res.json();
        if (jsonRes.success) {
          localStorage.clear();
          setIsLoggedIn(false);
          setCurrentUser(null);
        }
        console.log(jsonRes);
      } catch (err) {}
    }
  };

  // check auth state
  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true);
      let user = localStorage.getItem("user");
      user = JSON.parse(user);
      setCurrentUser(user);
    } else setIsLoggedIn(false);
  }, []);

  // refresh access token
  useEffect(() => {
    if (sessionExpired) console.log("expired");
  }, [sessionExpired]);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    loginVisible,
    setLoginVisible,
    registerVisible,
    setRegisterVisible,
    currentUser,
    setCurrentUser,
    getToken,
    editModal,
    setEditModal,
    logout,
    sessionExpired,
    setSessionExpired,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? (
        children
      ) : (
        <div
          className="loading"
          style={{ height: "100vh", display: "grid", placeItems: "center" }}
        >
          Loading
        </div>
      )}
    </AuthContext.Provider>
  );
}
