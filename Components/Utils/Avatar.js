import React from "react";
import { motion } from "framer-motion";
import { useAssets } from "../../Context/AssetsContext";
import styles from "../../styles/Utils.module.scss";
import router from "next/router";

const Avatar = ({ style, value, id, route = true, onClick, ...rest }) => {
  const { avatars, avatarImgs } = useAssets();

  return (
    <motion.div
      onClick={(e) => {
        e.stopPropagation();
        if (route) {
          router.push(`/profile/${id}`);
        } else {
          onClick();
        }
      }}
      {...rest}
      className={styles.profile}
      style={style}
    >
      {/* {avatars[value]} */}
      <img src={avatarImgs[value]} alt="askdfjnabf" />
    </motion.div>
  );
};

export default Avatar;
