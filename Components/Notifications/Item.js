import Avatar from "../Utils/Avatar";
import styles from "../../styles/Notifications.module.scss";
import { motion } from "framer-motion";

export default function Item({ item }) {
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
            console.log("hello");
          }}
        >
          {item.user}
        </strong>{" "}
        has commented on your photo.
      </p>
      <span className={styles.time}>{item.time}</span>
    </motion.div>
  );
}
