import styles from "../../styles/UserInfo.module.scss";
import modalStyles from "../../styles/Modals/Modal.module.scss";
import { useForm } from "react-hook-form";
import { useAssets } from "../../Context/AssetsContext";
import Avatar from "../Utils/Avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import EditProfileModal from "../Modals/EditProfileModal";
import { useAuth } from "../../Context/AuthContext";
import ButtonLoader from "../Utils/ButtonLoader";

const UserInfo = ({ data, status }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const { avatars } = useAssets();
  const { editModal, setEditModal } = useAuth();

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
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
                value={data.persona}
                style={{
                  borderRadius: "50%",
                  width: "150px",
                  height: "150px",
                }}
              />
            </div>
            <motion.div className={styles.information}>
              <motion.div className={styles.editContainer}>
                <h1>{data.username}</h1>
                {status ? (
                  <h2
                    onClick={() => {
                      setEditModal(true);
                    }}
                    className={`${styles.edit} pointer`}
                  >
                    {pen}
                  </h2>
                ) : (
                  <div className={modalStyles.submit}>
                    <ButtonLoader value="Connect" />
                  </div>
                )}
              </motion.div>
              <h3>{data.connections_count} Connections</h3>
              <span className={styles.email}>
                {" "}
                {link} {data.email}
              </span>
              <p>
                {data.bio ||
                  `Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                accusantium nam nesciunt esse mollitia enim atque adipisci quia
                quaerat ad!`}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default UserInfo;

const link = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M5.72803 8.0261C5.96065 8.33709 6.25743 8.59441 6.59824 8.78061C6.93905 8.96681 7.31593 9.07754 7.7033 9.10528C8.09067 9.13303 8.47947 9.07714 8.84334 8.9414C9.20721 8.80567 9.53763 8.59327 9.81219 8.3186L11.4372 6.6936C11.9305 6.18281 12.2035 5.49868 12.1974 4.78856C12.1912 4.07844 11.9064 3.39916 11.4042 2.89701C10.9021 2.39487 10.2228 2.11003 9.51266 2.10386C8.80254 2.09769 8.11841 2.37068 7.60761 2.86402L6.67594 3.79027"
        stroke="#132BFF"
        strokeWidth="1.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.89423 6.94291C7.66161 6.63193 7.36483 6.3746 7.02402 6.1884C6.6832 6.0022 6.30633 5.89147 5.91896 5.86373C5.53159 5.83599 5.14279 5.89188 4.77892 6.02761C4.41505 6.16335 4.08463 6.37575 3.81007 6.65041L2.18507 8.27541C1.69172 8.78621 1.41874 9.47034 1.42491 10.1805C1.43108 10.8906 1.71591 11.5699 2.21806 12.072C2.7202 12.5742 3.39949 12.859 4.1096 12.8652C4.81972 12.8713 5.50385 12.5983 6.01465 12.105L6.9409 11.1787"
        stroke="#132BFF"
        strokeWidth="1.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          width="13"
          height="13"
          fill="white"
          transform="translate(0.311035 0.984619)"
        />
      </clipPath>
    </defs>
  </svg>
);

const parentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  hover: {
    scale: 1.5,
    transition: {
      duration: 0.3,
    },
  },
};

const childVariants = {
  hidden: { x: 10, scale: 0 },
  visible: { x: 0, scale: 1 },
  hover: {
    scale: 0.9,
    rotate: 10,
    transition: {
      duration: 0.3,
      ease: [0.16, -0.5, 0.78, 1.43],
    },
  },
};

const pen = (
  <motion.svg
    variants={parentVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    whileHover="hover"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      variants={childVariants}
      d="M32.3672 11.5339C32.3683 11.3422 32.3316 11.1521 32.2591 10.9745C32.1866 10.797 32.0797 10.6356 31.9447 10.4994L25.7667 4.32138C25.6305 4.18634 25.469 4.0795 25.2915 4.00699C25.114 3.93447 24.9239 3.89772 24.7321 3.89883C24.5404 3.89772 24.3503 3.93447 24.1727 4.00699C23.9952 4.0795 23.8338 4.18634 23.6976 4.32138L19.5741 8.44492L3.64816 24.3708C3.51312 24.507 3.40628 24.6684 3.33377 24.846C3.26126 25.0235 3.2245 25.2136 3.22561 25.4053V31.5834C3.22561 31.9698 3.37912 32.3404 3.65238 32.6137C3.92564 32.8869 4.29625 33.0405 4.68269 33.0405H10.8607C11.0646 33.0515 11.2685 33.0197 11.4593 32.9469C11.6501 32.8741 11.8234 32.762 11.9681 32.6179L27.8066 16.692L31.9447 12.6413C32.0777 12.5001 32.186 12.3376 32.2652 12.1605C32.2793 12.0443 32.2793 11.9269 32.2652 11.8108C32.2721 11.743 32.2721 11.6746 32.2652 11.6068L32.3672 11.5339ZM10.2633 30.1263H6.13977V26.0027L20.6086 11.5339L24.7321 15.6575L10.2633 30.1263ZM26.7866 13.603L22.6631 9.47945L24.7321 7.42496L28.8411 11.5339L26.7866 13.603Z"
      fill="#F45B49"
    />
  </motion.svg>
);
