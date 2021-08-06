import React from "react";
import { motion } from "framer-motion";
import { useData } from "../../Context/DataContext";
import styles from "../../styles/Utils.module.scss";

const Avatar = ({ style, value }) => {
  const { avatars } = useData();

  return (
    <motion.div className={styles.profile} style={style}>
      {avatars[value]}
    </motion.div>
  );
};

export default Avatar;
