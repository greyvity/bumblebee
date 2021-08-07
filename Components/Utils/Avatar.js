import React from "react";
import { motion } from "framer-motion";
import { useAssets } from "../../Context/AssetsContext";
import styles from "../../styles/Utils.module.scss";

const Avatar = ({ style, value, ...rest }) => {
  const { avatars } = useAssets();

  return (
    <motion.div {...rest} className={styles.profile} style={style}>
      {avatars[value]}
    </motion.div>
  );
};

export default Avatar;
