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
import { motion } from "framer-motion";
import Loader from "../Components/Utils/Loader";

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
  const [connections, setConnections] = useState(null);

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
        if (jsonRes.code === "token_not_valid") return;

        setSuggestions((prev) => {
          if (prev !== jsonRes.suggestions) return jsonRes.suggestions;
        });
      } catch (err) {}
    }
  }, [sessionExpired]);

  // getConnections
  const fetchConnections = useCallback(async () => {
    if (!sessionExpired) {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      };
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/connection/user/username=${currentUser?.user_details?.username}/list`,
          config
        );
        const jsonRes = await res.json();
        if (jsonRes.code === "token_not_valid") return;
        setConnections(jsonRes);
      } catch (err) {}
    }
  }, [currentUser, sessionExpired]);

  // getUserFeed
  const fetchUserFeed = useCallback(
    async (username) => {
      if (!sessionExpired) {
        const config = {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        };
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/content/buzz/user=${username}/list`,
            config
          );
          const jsonRes = await res.json();
          if (jsonRes.code === "token_not_valid") return;

          return jsonRes;
        } catch (err) {}
      }
    },
    [currentUser, sessionExpired]
  );

  // getProfile
  const fetchProfile = useCallback(
    async (username) => {
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
          if (jsonRes.code === "token_not_valid") return;

          if (username !== currentUser?.user_details?.username) {
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
      method: "PATCH",
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
      const jsonRes = await res.json();
      return jsonRes;
    } catch (err) {}
  };

  // Post A buzz
  const createBuzz = async (config) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/content/buzz/create`,
        config
      );
      const jsonRes = await res.json();
      return jsonRes;
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
      const jsonRes = await res.json();
    } catch (err) {}
  };

  // Delete A buzz
  const deleteBuzz = async (buzzid, setFeed) => {
    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(values),
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/content/buzz/id=${buzzid}/delete`,
        config
      );
      const jsonRes = await res.json();
      if (jsonRes.success) {
        const res = await fetchUserFeed(profile?.username);
        setFeed(res);
      }
    } catch (err) {}
  };

  // Add Connection
  const connect = async (username) => {
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/connection/user/follow`,
        config
      );
      const jsonRes = await res.json();
      if (jsonRes.success) {
        await fetchConnections();
        const data = await fetchProfile(username);
        return {
          status: {
            success: true,
            message: `You are now following ${username}`,
          },
          data,
        };
      }
    } catch (err) {
      return {
        success: false,
        message: "Something went wrong try again later",
      };
    }
  };

  // Remove Connection
  const unFollow = async (username) => {
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/connection/user/follow`,
        config
      );
      const jsonRes = await res.json();
      if (jsonRes.success) {
        await fetchConnections();
        const data = await fetchProfile(username);
        return {
          status: {
            success: true,
            message: `You are no longer following ${username}`,
          },
          data,
        };
      }
    } catch (err) {
      return {
        success: false,
        message: "Something went wrong try again later",
      };
    }
  };

  // get Buzz Details
  const getBuzzDetails = async (buzzid, setBuzzDetails) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/content/buzz/id=${buzzid}/detail`
      );
      const buzz = await res.json();
      if (buzz.error) throw buzz.error;
      if (setBuzzDetails) setBuzzDetails(buzz);
    } catch (error) {
      return { props: {} };
    }
  };

  // Upvote, downvote
  const interactPostVote = async (vote, id, setBuzzDetails) => {
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/content/buzz/id=${id}/${vote}`,
        config
      );
      const jsonRes = await res.json();
      if (jsonRes.success) {
        if (setBuzzDetails) getBuzzDetails(id, setBuzzDetails);
        return {
          success: true,
          isUpvoted: jsonRes.success.message === "Added UPVOTE" ? true : false,
        };
      }
    } catch (err) {
      return {
        success: false,
        message: "Something went wrong try again later",
      };
    }
  };

  // get Comments
  const getComments = async (buzzid, setComments) => {
    try {
      const info = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/comment/buzz/id=${buzzid}/list`
      );
      const comments = await info.json();
      setComments((prev) => {
        if (prev !== comments) return comments;
      });
    } catch (error) {}
  };

  // comment on buzz
  const comment = async (values, buzzid, setComments) => {
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
        `${process.env.NEXT_PUBLIC_URL}/api/comment/buzz/id=${buzzid}/create`,
        config
      );
      const jsonRes = await res.json();
      if (jsonRes.success) {
        getComments(buzzid, setComments);
        return {
          success: true,
          message: "Comment Added",
        };
      }
    } catch (err) {
      return {
        success: false,
        message: "Something went wrong try again later",
      };
    }
  };

  // delete comment on buzz
  const deleteComment = async (commentid, buzzid, setComments) => {
    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/comment/id=${commentid}/delete`,
        config
      );
      const jsonRes = await res.json();
      if (jsonRes.success) {
        getComments(buzzid, setComments);
        return {
          success: true,
          message: "Comment Removed",
        };
      }
    } catch (err) {
      return {
        success: false,
        message: "Something went wrong try again later",
      };
    }
  };

  // Search
  const searchQuery = async (query) => {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/search/list?keyword=${query}`,
        config
      );
      const jsonRes = await res.json();
      if (jsonRes.users) {
        return {
          success: true,
          message: "Comment Added",
          data: jsonRes,
        };
      } else throw "error";
    } catch (err) {
      return {
        success: false,
        message: "Something went wrong try again later",
      };
    }
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
      await fetchConnections();
      await fetchProfile(currentUser?.user_details?.username);
    }
    if (isLoggedIn) {
      temp();
      const loadData = setInterval(temp, 5000);
      return () => clearInterval(loadData);
    } else {
      setLoading(false);
    }
  }, [
    isLoggedIn,
    currentUser,
    fetchFeed,
    fetchNotifs,
    getFollowSuggestions,
    fetchConnections,
    fetchProfile,
  ]);

  const value = {
    feed,
    setFeed,
    notifs,
    profile,
    createBuzz,
    editBuzz,
    deleteBuzz,
    updateProfile,
    fetchProfile,
    fetchFeed,
    fetchNotifs,
    suggestions,
    setSuggestions,
    connect,
    fetchConnections,
    connections,
    setConnections,
    unFollow,
    fetchUserFeed,
    interactPostVote,
    comment,
    getToken,
    getComments,
    searchQuery,
    deleteComment,
  };

  return (
    <DataContext.Provider value={value}>
      {!loading ? (
        children
      ) : !sessionExpired ? (
        <Loader showTitle={true} />
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
