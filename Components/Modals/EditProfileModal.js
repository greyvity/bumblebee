import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/Modals/Modal.module.scss";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "200px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const EditProfileModal = ({ visible, x, y, setVisible }) => {
  console.log(x, y, visible);
  return (
    visible && (
      <motion.div
        className={styles.backdrop}
        //   variants={backdrop}
        //   initial="hidden"
        //   animate="visible"
        //   exit="hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          // style={{ width: "50%" }}
          className={styles.modal}
          onClick={() => setVisible(false)}
          // variants={modal}
          initial={{ x, y, opacity: 1, scale: 0 }}
          animate={{
            x: 0,
            y: 200,
            opacity: 1,
            scale: 1,
            transition: {
              delay: 0.5,
            },
          }}
        >
          <h1 className={styles["modal-heading"]}>Edit Profile</h1>
        </motion.div>
      </motion.div>
    )
  );
};

export default EditProfileModal;
