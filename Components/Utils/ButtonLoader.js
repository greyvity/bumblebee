import React, { useState } from "react";
import { AnimateSharedLayout, motion } from "framer-motion";
import modalStyles from "../../styles/Modals/Modal.module.scss";

const ButtonLoader = ({
  connected,
  value,
  styles = modalStyles,
  loading,
  ...rest
}) => {
  const loader = (
    <motion.svg
      variants={loaderVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      width="30"
      height="11"
      viewBox="0 0 100 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.circle
        variants={childVariants}
        custom={{ value: 5, connected }}
        cx="2.65137"
        cy="8.79981"
        r="2.54443"
        fill="white"
      />
      <motion.circle
        variants={childVariants}
        custom={{ value: 10, connected }}
        cx="25.7974"
        cy="8.79981"
        r="2.54443"
        fill="white"
      />
      <motion.circle
        variants={childVariants}
        custom={{ value: 5, connected }}
        cx="14.2247"
        cy="5.6668"
        r="5.11382"
        fill="white"
      />
    </motion.svg>
  );

  return (
    <AnimateSharedLayout>
      <motion.button
        {...rest}
        // layout
        whileHover={{
          filter: "contrast(0.9)",
          boxShadow: "0 0 10px 2px rgba(0,0,0,0.2)",
          transition: {
            duration: 0.5,
          },
        }}
        type="submit"
        whileTap={{
          y: 5,
        }}
      >
        {loading && (
          <motion.span className={styles.loading}>{loader}</motion.span>
        )}
        <motion.span
          animate={{
            color: connected ? "#f45b49" : "#ffffff",
          }}
          className={styles.button}
        >
          {value}
        </motion.span>
      </motion.button>
    </AnimateSharedLayout>
  );
};

export default ButtonLoader;

const loaderVariants = {
  visible: (loading) => ({
    opacity: 1,
    x: 15,
    y: 2,
    scale: 4,
  }),
  hidden: (loading) => ({
    opacity: 0,
    scale: 0,
    x: 15,
    y: 2,
  }),
  exit: { opacity: 0 },
};

const childVariants = {
  visible: ({ value, connected }) => ({
    y: -value,
    fill: connected ? "#f45b49" : "#ffffff",
    transition: {
      duration: 0.5,
      repeatType: "reverse",
      repeat: Infinity,
      ease: [0.25, 0.78, 1, 0.77],
    },
  }),
  hidden: (loading) => ({
    y: 0,
  }),
  exit: { opacity: 0 },
};
