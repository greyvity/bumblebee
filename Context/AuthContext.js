import { useContext, createContext, useState, useEffect } from "react";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginVisible, setLoginVisible] = useState(true);

  const getToken = () => {
    let token = localStorage.getItem("authToken");
    if (token) {
      token = JSON.stringify(token);
      return token;
    } else return;
  };

  const fetchData = async (endpoint, useToken) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/${endpoint}`);
  };

  useEffect(() => {
    if (getToken()) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, []);

  const loginUser = async () => {
    if (!getToken()) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/login`);
    } else console.log("user already logged in");
  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    loginVisible,
    setLoginVisible,
    loginUser,
    fetchData,
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
