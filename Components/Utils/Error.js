import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

const Error = ({ visible, message, styles, ...rest }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          className={`${styles.errorMessage} ${styles.message}`}
        >
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Error;
