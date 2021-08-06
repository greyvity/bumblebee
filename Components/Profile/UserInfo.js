import styles from "../../styles/UserInfo.module.scss";
import { useForm } from "react-hook-form";
import { useData } from "../../Context/DataContext";
import Avatar from "../Utils/Avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import EditProfileModal from "../Modals/EditProfileModal";

const UserInfo = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const { avatars } = useData();
  const [mousePosition, setMousePosition] = useState({});
  const onSubmit = (values) => {
    console.log(values);
  };

  const [editModal, setEditModal] = useState(false);

  return (
    <>
      {/* {editModal && */}
      <AnimatePresence>
        <EditProfileModal
          visible={editModal}
          x={mousePosition.x}
          y={mousePosition.y}
          setVisible={setEditModal}
        />
      </AnimatePresence>

      {/* // } */}
      <motion.div
        initial={{ y: -500, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            delay: 0.3,
            duration: 0.3,
          },
        }}
        exit={{ y: -500, opacity: 0 }}
        className={styles.wrapper}
      >
        <motion.div className={styles.container}>
          <motion.h1 className={styles.title}>Profile</motion.h1>
          <motion.div className={styles.profile}>
            <div className={styles.avatarContainer}>
              <Avatar
                value={0}
                style={{
                  borderRadius: "50%",
                  width: "150px",
                  height: "150px",
                }}
              />
            </div>
            <motion.div className={styles.information}>
              <motion.div className={styles.editContainer}>
                <h1>Yogesh Pant</h1>
                <h2
                  onClick={({ clientX, clientY }) => {
                    setEditModal(true);

                    setMousePosition({
                      // x: window.innerWidth - clientX,
                      x: 1400 - clientX,
                      y: 230 - clientY,
                    });
                  }}
                  className="pointer"
                >
                  {" "}
                  /{" "}
                </h2>
              </motion.div>
              <h3>25 Connections</h3>
              <span> /link/ yogeshpant293@gmail.com </span>
              <p>
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                accusantium nam nesciunt esse mollitia enim atque adipisci quia
                quaerat ad!{" "}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default UserInfo;
