import styles from "../../styles/Mayknow.module.scss";
import { motion } from "framer-motion";
import Item from "./Item";
import { useData } from "../../Context/DataContext";

const MayKnow = () => {
  const { suggestions } = useData();

  const variants = {
    closed: {
      x: 100,
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        delay: 0.6,
      },
    },
  };

  return (
    <motion.div
      layout
      initial={{ y: 500, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          delay: 0.45,
          duration: 0.3,
        },
      }}
      exit={{ y: 500, opacity: 0 }}
      className={styles.wrapper}
    >
      <div className={styles.container}>
        <h1 className={styles.title}> {knowIcon} People Your May Know </h1>
        <motion.div
          layout
          initial="closed"
          animate="open"
          variants={variants}
          className={styles.itemContainer}
        >
          {suggestions?.map((item) => (
            <Item key={item.userid} item={item} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MayKnow;

const knowIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
