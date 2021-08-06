import React from "react";
import { motion } from "framer-motion";
import styles from "../../styles/Utils.module.scss";

const Button = ({ style, children }) => {
  return (
    <motion.button className={styles.button} style={style}>
      {children}
    </motion.button>
  );
};

export default Button;
