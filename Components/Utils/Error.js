import { AnimatePresence, motion } from "framer-motion";
import styles from "../../styles/Notif.module.scss";

const Error = ({ visible, message, ...rest }) => {
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
