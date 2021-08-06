import styles from "../../styles/Notifications.module.scss";
import { motion } from "framer-motion";
import Item from "./Item";

const Notifications = () => {
  return (
    <motion.div
      initial={{ x: 500, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          delay: 0.45,
          duration: 0.3,
        },
      }}
      exit={{ x: 500, opacity: 0 }}
      className={styles.wrapper}
    >
      <div className={styles.container}>
        <h1 className={styles.title}> {notifIcon} Notifications </h1>
        <motion.div className={styles.itemContainer}>
          {notifs.map((notif) => (
            <Item key={notif.id} item={notif} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Notifications;

const notifIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const notifs = [
  {
    id: 1,
    user: "Image",
    profileUrl: "/profile/image",
    postUrl: "/posts",
    time: "2s",
    avatar: 0,
  },
  {
    id: 2,
    user: "Image",
    profileUrl: "/profile/image",
    postUrl: "/posts",
    time: "2s",
    avatar: 0,
  },
  {
    id: 3,
    user: "Sambeg",
    profileUrl: "/profile/image",
    postUrl: "/posts",
    time: "2s",
    avatar: 1,
  },
  {
    id: 4,
    user: "Sajag",
    profileUrl: "/profile/image",
    postUrl: "/posts",
    time: "2s",
    avatar: 1,
  },
  {
    id: 5,
    user: "Image",
    profileUrl: "/profile/image",
    postUrl: "/posts",
    time: "2s",
    avatar: 0,
  },
  {
    id: 6,
    user: "Image",
    profileUrl: "/profile/image",
    postUrl: "/posts",
    time: "2s",
    avatar: 0,
  },
  {
    id: 7,
    user: "Image",
    profileUrl: "/profile/image",
    postUrl: "/posts",
    time: "2s",
    avatar: 0,
  },
];
