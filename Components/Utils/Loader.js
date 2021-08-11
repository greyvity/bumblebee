import { motion } from "framer-motion";

const Loader = ({ showTitle }) => {
  return (
    <div
      className="loading"
      // style={{ height: "100vh", display: "grid", placeItems: "center" }}
      style={{
        flexDirection: "column-reverse",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {logo}
      {showTitle && (
        <motion.h1
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: [1, 0.5, 1, 0.5],
            transition: {
              duration: 4,
              times: [0, 0.3, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatType: "reverse",
              ease: "backInOut",
            },
          }}
          className="loading-title"
        >
          Loading, Please Wait
        </motion.h1>
      )}
    </div>
  );
};

export default Loader;

const parentVariants = {
  hidden: { pathLength: 1, rotate: 0 },
  animate: { opacity: 1, scale: 10, rotate: -30 },
  // animate: { scale: 10 },
};

const duration = 4;

const lineVariants = {
  hidden: { x: -5, y: 0 },
  animate: {
    x: [0, 20, 34, 20, 0],
    y: [0, 25, 0, -25, 0],
    rotate: [0, -90, -180, -270, -360],
    transition: {
      x: {
        duration,
        times: [0, 0.32, 0.5, 0.75, 1],
        repeat: Infinity,
        repeatType: "reverse",
        ease: "backInOut",
      },
      y: {
        duration,
        times: [0, 0.3, 0.5, 0.75, 1],
        repeat: Infinity,
        repeatType: "reverse",
        ease: "backInOut",
      },
      rotate: {
        duration,
        times: [0, 0.3, 0.5, 0.75, 1],
        repeat: Infinity,
        repeatType: "reverse",
        ease: "backInOut",
      },
      duration: 5,
    },
  },
};

const circleVariants = {
  hidden: { opacity: 1 },
  animate: {
    scale: 0.9,
    y: [0, -10, -10, 0, 0],
    transition: {
      y: {
        duration: 4,
        times: [0, 0.3, 0.5, 0.75, 1],
        repeat: Infinity,
        repeatType: "reverse",
        ease: "backInOut",
      },
    },
  },
};

const smallVariants = {
  hidden: { opacity: 1, scale: 1 },
  animate: {
    opacity: [1, 0, 0, 0, 1],
    scale: [1, 0, 0, 0, 1],
    // y: [0, -10, 0],
    transition: {
      duration: 4,
      times: [0, 0.3, 0.5, 0.75, 1],
      repeat: Infinity,
      repeatType: "reverse",
      ease: "backInOut",
    },
  },
};

const groupVariants = {
  hidden: { opacity: 1 },
  animate: { x: 17.5 },
  // animate: { scale: 10 },
};

const group2Variants = {
  hidden: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
  // animate: { scale: 10 },
};

const logo = (
  <motion.svg
    variants={parentVariants}
    animate="animate"
    initial="hidden"
    width="35"
    height="35"
    viewBox="0 0 80 35"
    fill="#000"
    style={{
      // border: "1px solid black",
      filter: "drop-shadow( 2px 2px 2px rgba(0, 0, 0, .2))",
    }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.g variants={groupVariants}>
      <motion.path
        variants={circleVariants}
        d="M23.1193 8.13825C23.1193 11.8402 20.1183 14.8412 16.4163 14.8412C12.7144 14.8412 9.71338 11.8402 9.71338 8.13825C9.71338 4.43631 12.7144 1.4353 16.4163 1.4353C20.1183 1.4353 23.1193 4.43631 23.1193 8.13825Z"
        fill="#F45B49"
      />
      <motion.g variants={group2Variants}>
        <motion.path
          variants={circleVariants}
          d="M24.3416 26.0746C24.3416 30.4517 20.7932 34 16.4161 34C12.0391 34 8.49072 30.4517 8.49072 26.0746C8.49072 21.6975 12.0391 18.1492 16.4161 18.1492C20.7932 18.1492 24.3416 21.6975 24.3416 26.0746Z"
          fill="#F45B49"
        />
        <motion.path
          variants={smallVariants}
          d="M34.5603 29.0404C34.5603 30.4674 33.4035 31.6243 31.9764 31.6243C30.5494 31.6243 29.3926 30.4674 29.3926 29.0404C29.3926 27.6134 30.5494 26.4565 31.9764 26.4565C33.4035 26.4565 34.5603 27.6134 34.5603 29.0404Z"
          fill="#F45B49"
        />
      </motion.g>
      <motion.path
        variants={lineVariants}
        d="M3.43994 3.14404L3.43994 31.6242"
        stroke="#F45B49"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </motion.g>
  </motion.svg>
);
