import Avatar from "../Utils/Avatar";
import styles from "../../styles/Notifications.module.scss";
import { motion } from "framer-motion";
import router from "next/router";
import Link from "next/link";

export default function Item({ item }) {
  const childVariants = {
    closed: {
      x: 100,
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div layout variants={childVariants} className={styles.item}>
      <Avatar
        id={item?.agent?.username || item?.follower?.username}
        className="pointer"
        value={item?.agent?.persona || item?.follower?.persona}
        style={{
          borderRadius: "50%",
          width: "38px",
          height: "38px",
          border: "2px solid black",
        }}
      />

      <p
        onClick={() => {
          router.push(`/buzz/${item.buzzid}`);
        }}
        className={`${styles.notification} pointer`}
      >
        {item.notification}
      </p>
      <span className={styles.time}>{item.time}</span>
    </motion.div>
  );
}
