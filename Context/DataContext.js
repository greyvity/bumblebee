import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import ButtonLoader from "../Components/Utils/ButtonLoader";
import { useAuth } from "./AuthContext";
import styles from "../styles/Modals/Modal.module.scss";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  // states
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState(null);
  const [notifs, setNotifs] = useState(null);
  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const {
    currentUser,
    setIsLoggedIn,
    setCurrentUser,
    logout,
    isLoggedIn,
    getToken,
    sessionExpired,
    setSessionExpired,
  } = useAuth();

  // getPosts
  const fetchFeed = useCallback(async () => {
    if (!sessionExpired) {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      };
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/feed/post`,
          config
        );
        const jsonRes = await res.json();
        if (jsonRes.code === "token_not_valid") setSessionExpired(true);
        setFeed((prev) => {
          if (prev !== jsonRes.post) return jsonRes?.post;
        });
      } catch (err) {}
    }
  }, [sessionExpired]);

  // getNotifications
  const fetchNotifs = useCallback(async () => {
    if (!sessionExpired) {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      };
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/notification/individual/list`,
          config
        );
        const jsonRes = await res.json();
        console.log(jsonRes);
        if (jsonRes.code === "token_not_valid") return;
        setNotifs((prev) => {
          if (prev !== jsonRes.notifications) return jsonRes?.notifications;
        });
      } catch (err) {}
    }
  }, [sessionExpired]);

  // getFollowSuggestions
  const getFollowSuggestions = useCallback(async () => {
    if (!sessionExpired) {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      };
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/feed/follow_suggestions`,
          config
        );
        const jsonRes = await res.json();
        console.log(jsonRes);
        if (jsonRes.code === "token_not_valid") return;

        setSuggestions((prev) => {
          if (prev !== jsonRes.suggestions) return jsonRes.suggestions;
        });
      } catch (err) {}
    }
  }, [sessionExpired]);

  // getProfile
  const fetchProfile = useCallback(
    async (username) => {
      console.log(username);
      if (!sessionExpired && username) {
        const config = {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        };
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/profile/detail/user=${username}`,
            config
          );
          const jsonRes = await res.json();
          console.log(jsonRes);
          if (jsonRes.code === "token_not_valid") return;

          if (username !== currentUser?.user_details?.username) {
            setUserProfile(jsonRes);
            return jsonRes;
          }

          setProfile((prev) => {
            if (prev !== jsonRes) return jsonRes;
          });
          setLoading(false);
          return jsonRes;
        } catch (err) {}
      }
    },
    [currentUser, sessionExpired]
  );

  // updateProfile
  const updateProfile = async (values) => {
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/profile/update/user=${currentUser?.user_details?.username}`,
        config
      );
      console.log(res);
      const jsonRes = await res.json();
      console.log(jsonRes);
    } catch (err) {}
  };

  // usePersona
  const usePersona = async (values) => {
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/profile/enable_disable_persona/user=${currentUser?.user_details?.username}`,
        config
      );
      console.log(res);
      const jsonRes = await res.json();
      console.log(jsonRes);
    } catch (err) {}
  };

  // Post A buzz
  const createBuzz = async (values) => {
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/content/buzz/create`,
        config
      );
      console.log(res);
      const jsonRes = await res.json();
      console.log(jsonRes);
    } catch (err) {}
  };

  // Edit A buzz
  const editBuzz = async (values) => {
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/content/buzz/id=${values.buzzId}/edit`,
        config
      );
      console.log(res);
      const jsonRes = await res.json();
      console.log(jsonRes);
    } catch (err) {}
  };

  // Delete A buzz
  const deleteBuzz = async (values) => {
    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/content/buzz/id=${values.buzzId}/delete`,
        config
      );
      console.log(res);
      const jsonRes = await res.json();
      console.log(jsonRes);
    } catch (err) {}
  };

  const handleLogout = async () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSessionExpired(false);
  };

  useEffect(() => {
    setLoading(true);
    async function temp() {
      await fetchFeed();
      await fetchNotifs();
      await getFollowSuggestions();
      await fetchProfile(currentUser?.user_details?.username);
    }
    if (isLoggedIn) {
      temp();
      // const loadData = setInterval(temp, 5000);
      // return () => clearInterval(loadData);
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const value = {
    feed,
    setFeed,
    notifs,
    profile,
    deleteBuzz,
    editBuzz,
    usePersona,
    updateProfile,
    fetchProfile,
    fetchFeed,
    fetchNotifs,
    suggestions,
    setSuggestions,
  };

  return (
    <DataContext.Provider value={value}>
      {!loading ? (
        children
      ) : !sessionExpired ? (
        <div
          className="loading"
          style={{ height: "100vh", display: "grid", placeItems: "center" }}
        >
          Loading
        </div>
      ) : (
        <div
          className="session-expired"
          style={{ height: "100vh", display: "grid", placeItems: "center" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <h1 style={{ fontFamily: "Montserrat" }}>
              Session Expired, Please Logout and Log in again
            </h1>
            <div className={styles.submit}>
              <ButtonLoader onClick={handleLogout} value="Logout" />
            </div>
          </div>
        </div>
      )}
    </DataContext.Provider>
  );
}

<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  }}
>
  <h1 style={{ fontFamily: "Montserrat" }}>
    Session Expired, Please Logout and Log in again
  </h1>
  <button
    style={{
      background: "tomato",
      border: "none",
      padding: "10px 20px",
      color: "white",
      fontFamily: "Montserrat",
      fontSize: "20px",
    }}
  >
    Logout
  </button>
</div>;
