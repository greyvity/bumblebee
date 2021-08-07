import Avatar from "../Utils/Avatar";
import styles from "../../styles/Notifications.module.scss";
import { motion } from "framer-motion";
import router from "next/router";

export default function Item({ item }) {
  console.log(item);
  return (
    <motion.div className={styles.item}>
      <Avatar
        value={item.avatar || 0}
        style={{
          borderRadius: "50%",
          width: "38px",
          height: "38px",
          border: "2px solid black",
        }}
      />
      <p onClick={() => console.log("bye")} className={styles.notification}>
        <strong
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/profile/${item.agent_username}`);
          }}
          className="pointer"
        >
          {item.agent_username}
        </strong>{" "}
        has commented on your photo.
      </p>
      <span className={styles.time}>{item.time}</span>
    </motion.div>
  );
}
