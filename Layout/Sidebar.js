import styles from "../styles/Sidebar.module.scss";
import { useData } from "../Context/DataContext";
import Avatar from "../Components/Utils/Avatar";
import { motion } from "framer-motion";
const Sidebar = () => {
  const { avatars } = useData();

  return (
    <motion.header
      initial={{ x: -500, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          delay: 0.25,
        },
      }}
      exit={{
        x: -500,
        opacity: 0,
      }}
      className={styles.wrapper}
    >
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.logoContainer}>
            <div className={styles.logo}>{logo}</div>
          </div>
          <div className={styles.navLink}>{home}</div>
          <div className={styles.navLink}>{saved}</div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.theme}>{theme}</div>
          <div className={styles.logout}>{logoutIcon}</div>
          <Avatar value={0} style={{ borderRadius: "50%" }} />
        </div>
      </div>
    </motion.header>
  );
};

export default Sidebar;

const logoutIcon = (
  <svg
    width="42"
    height="42"
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.5662 14.5837V11.3756C26.5662 10.5248 26.2282 9.70876 25.6266 9.10712C25.0249 8.50548 24.2089 8.16748 23.3581 8.16748H7.9591C7.10825 8.16748 6.29225 8.50548 5.69061 9.10712C5.08897 9.70876 4.75098 10.5248 4.75098 11.3756V30.6243C4.75098 31.4752 5.08897 32.2912 5.69061 32.8928C6.29225 33.4945 7.10825 33.8325 7.9591 33.8325H23.3581C24.2089 33.8325 25.0249 33.4945 25.6266 32.8928C26.2282 32.2912 26.5662 31.4752 26.5662 30.6243V27.4162"
      stroke="#242424"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M31.6992 14.5837L38.1155 21L31.6992 27.4162"
      stroke="#242424"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.2207 21H38.1161"
      stroke="#242424"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const home = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="33"
    height="35"
    fill="none"
    viewBox="0 0 33 35"
  >
    <path
      stroke="#000"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M11 33.5H5a3 3 0 01-3-3V14.411a3 3 0 011.087-2.31l11.5-9.518a3 3 0 013.826 0l11.5 9.517A3 3 0 0131 14.411V30.5a3 3 0 01-3 3h-6m-11 0V23a3 3 0 013-3h5a3 3 0 013 3v10.5m-11 0h11"
    ></path>
  </svg>
);

const saved = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="35"
    fill="none"
    viewBox="0 0 25 35"
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M1.5 31.777V7.5a6 6 0 016-6H17a6 6 0 016 6v24.316a1 1 0 01-1.479.877l-9.03-4.926a1 1 0 00-.976.01l-8.519 4.868a1 1 0 01-1.496-.868z"
    ></path>
  </svg>
);

const theme = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="33"
    height="40"
    fill="none"
    viewBox="0 0 33 40"
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth="2"
      d="M28 22v6"
    ></path>
    <path
      stroke="#000"
      strokeWidth="3"
      d="M11.101 21.833H3.878a1.833 1.833 0 01-1.83-1.415 1.833 1.833 0 01-.004-.821l3.667-16.5a1.833 1.833 0 011.833-1.43h18.334a1.834 1.834 0 011.833 1.43l3.63 16.5a1.832 1.832 0 01-1.005 2.06 1.832 1.832 0 01-.791.176H22.32m-11.22 0A16.353 16.353 0 016.5 35.216a1.833 1.833 0 001.302 3.117h17.82a1.833 1.833 0 001.302-3.116 16.354 16.354 0 01-4.602-13.384m-11.22 0h11.22"
    ></path>
  </svg>
);

const logo = (
  <svg
    width="35"
    height="35"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.1193 8.13825C23.1193 11.8402 20.1183 14.8412 16.4163 14.8412C12.7144 14.8412 9.71338 11.8402 9.71338 8.13825C9.71338 4.43631 12.7144 1.4353 16.4163 1.4353C20.1183 1.4353 23.1193 4.43631 23.1193 8.13825Z"
      fill="#F45B49"
    />
    <path
      d="M24.3416 26.0746C24.3416 30.4517 20.7932 34 16.4161 34C12.0391 34 8.49072 30.4517 8.49072 26.0746C8.49072 21.6975 12.0391 18.1492 16.4161 18.1492C20.7932 18.1492 24.3416 21.6975 24.3416 26.0746Z"
      fill="#F45B49"
    />
    <path
      d="M34.5603 29.0404C34.5603 30.4674 33.4035 31.6243 31.9764 31.6243C30.5494 31.6243 29.3926 30.4674 29.3926 29.0404C29.3926 27.6134 30.5494 26.4565 31.9764 26.4565C33.4035 26.4565 34.5603 27.6134 34.5603 29.0404Z"
      fill="#F45B49"
    />
    <path
      d="M3.43994 3.14404L3.43994 31.6242"
      stroke="#F45B49"
      strokeWidth="6"
      strokeLinecap="round"
    />
  </svg>
);
