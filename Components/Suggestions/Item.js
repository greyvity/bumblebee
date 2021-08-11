import Avatar from "../Utils/Avatar";
import styles from "../../styles/Mayknow.module.scss";
import { motion } from "framer-motion";
import { useData } from "../../Context/DataContext";
import { useState } from "react";

export default function Item({ item }) {
  const { connect, unFollow } = useData();
  const [connected, setConnected] = useState(false);

  const handleConnect = async () => {
    if (!connected) {
      const res = await connect(item.username);
      if (res?.status?.success) setConnected(true);
    } else {
      const res = await unFollow(item.username);
      if (res?.status?.success) setConnected(false);
    }
  };

  const childVariants = {
    closed: {
      x: 100,
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        // staggerChildren: 0.5,
        when: "beforeChildren",
      },
    },
  };

  const add = (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        animate={{
          stroke: connected ? "#f45b49" : "#000000",
          rotate: connected ? 495 : 0,
          transition: {
            duration: 1,
            ease: "backInOut",
          },
        }}
        d="M9.99902 3.01855V16.9817"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <motion.path
        animate={{
          stroke: connected ? "#f45b49" : "#000000",
          rotate: connected ? 495 : 0,
          transition: {
            duration: 1,
            ease: "backInOut",
          },
        }}
        d="M3.01855 10.1533L16.9817 10.1533"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.svg>
  );

  return (
    <motion.div layout variants={childVariants} className={styles.item}>
      <Avatar
        id={item.username}
        value={item.persona}
        style={{
          width: "50px",
          height: "50px",
          border: "2px solid black",
        }}
      />
      {console.log(item.persona)}
      <h4>{item.username}</h4>

      <span onClick={handleConnect} className={styles.time}>
        {add}
      </span>
    </motion.div>
  );
}
