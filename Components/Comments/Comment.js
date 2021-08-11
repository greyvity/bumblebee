import Avatar from "../Utils/Avatar";
import styles from "../../styles/Post.module.scss";
import { useEffect, useState } from "react";
import router from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../Context/AuthContext";

const Comment = ({ item, handleDeleteComment }) => {
  const [negative, setNegative] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (item.sentiment_value < 0.25) setNegative(true);
  }, []);

  const handleToggleView = () => {
    if (item.sentiment_value < 0.25) {
      setNegative(!negative);
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

  return (
    <>
      <motion.div layout variants={childVariants}>
        <AnimatePresence exitBeforeEnter>
          {!negative ? (
            <motion.div
              layout
              initial={{ x: -100, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{ x: -100, opacity: 0 }}
              key="positive"
              onClick={handleToggleView}
              className={styles.commentCard}
            >
              <motion.div className={styles.profile}>
                <Avatar
                  id={item.commenter.username}
                  value={item.commenter.persona}
                  style={{
                    borderRadius: "50%",
                    margin: "auto",
                    width: "37px",
                    height: "37px",
                  }}
                />
              </motion.div>
              <div className={styles.commentInfo}>
                <h3 className={styles.username}>{item.commenter.username}</h3>

                {item.content && (
                  <p
                    className={`${styles.content} ${
                      item.sentiment_value < 0.25 ? styles.red : ""
                    }`}
                  >
                    {item.content}
                  </p>
                )}
              </div>
              {item.commenter.username ===
                currentUser?.user_details?.username && (
                <span
                  onClick={() => {
                    handleDeleteComment(item.commentid);
                  }}
                  className={styles.delete}
                >
                  {bin}
                </span>
              )}
            </motion.div>
          ) : (
            <motion.div
              layout
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              key="negative"
              className={styles.commentFiltered}
              onClick={handleToggleView}
            >
              <h3 className={styles.red}> {report} Click To Toggle View </h3>
              <p className={styles.content}>
                Comment Hidden <br /> sentiment value ={" "}
                <span className={styles.red}>
                  {Number.parseFloat(item.sentiment_value).toPrecision(4)}
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          variants={{
            closed: { y: 10, opacity: 0 },
            open: { y: 0, opacity: 1 },
          }}
          layout
          className={styles.divider}
        ></motion.div>
      </motion.div>
    </>
  );
};

export default Comment;

const report = (
  <svg
    width="22"
    height="23"
    viewBox="0 0 22 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.75333 3.10261C10.3777 2.74215 11.1469 2.74215 11.7712 3.10261L17.8184 6.59395C18.4427 6.95441 18.8273 7.62057 18.8273 8.34149V15.3242C18.8273 16.0451 18.4427 16.7113 17.8184 17.0717L11.7712 20.5631C11.1469 20.9235 10.3777 20.9235 9.75333 20.5631L3.70615 17.0717C3.08181 16.7113 2.69721 16.0451 2.69721 15.3242V8.34149C2.69721 7.62057 3.08181 6.95441 3.70615 6.59395L9.75333 3.10261Z"
      stroke="#FF0000"
      strokeWidth="1.34526"
    />
    <path
      d="M10.7622 7.12451V14.0242"
      stroke="#FF0000"
      strokeWidth="1.34526"
      strokeLinecap="round"
    />
    <circle cx="10.762" cy="16.5413" r="0.672628" fill="#FF0000" />
  </svg>
);

const parent2Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, scale: 2.5 },
  hover: {
    scale: 2.8,
    transition: {
      duration: 0.3,
    },
  },
};

const childVariants = {
  hidden: { x: 10, scale: 0 },
  visible: { x: 0, scale: 1 },
  hover: {
    scale: 1,
    rotate: 10,
    transition: {
      duration: 0.3,
      ease: [0.16, -0.5, 0.78, 1.43],
    },
  },
};

const child2Variants = {
  hidden: { x: 10, scale: 0 },
  visible: { x: 0, scale: 1 },
  hover: {
    scale: 0.9,
    y: -1,
    rotate: -10,
    transition: {
      duration: 0.3,
      ease: [0.16, -0.5, 0.78, 1.43],
    },
  },
};

const bin = (
  <motion.svg
    variants={parent2Variants}
    initial="hidden"
    animate="visible"
    whileHover="hover"
    width="18"
    height="22"
    viewBox="0 0 30 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      variants={childVariants}
      d="M2.3877 6.28687V17.4963C2.3877 18.3071 2.68628 19.0847 3.21776 19.658C3.74924 20.2314 4.47008 20.5534 5.22171 20.5534H12.7791C13.5307 20.5534 14.2515 20.2314 14.783 19.658C15.3145 19.0847 15.6131 18.3071 15.6131 17.4963V6.28687"
      stroke="#F45B49"
      strokeWidth="2"
    />
    <motion.path
      variants={child2Variants}
      d="M16.884 5.44653H12.9418M12.9418 5.44653V4.44653C12.9418 3.65088 12.6303 2.88782 12.0758 2.32521C11.5213 1.7626 10.7693 1.44653 9.98514 1.44653H7.9356C7.15145 1.44653 6.47787 1.7626 5.92339 2.32521C5.36892 2.88782 5.05741 3.65088 5.05741 4.44653V5.44653M12.9418 5.44653H5.05741M5.05741 5.44653H1.11523"
      stroke="#F45B49"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </motion.svg>
);
