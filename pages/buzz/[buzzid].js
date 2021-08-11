import styles from "../../styles/Post.module.scss";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Image from "next/image";
import Avatar from "../../Components/Utils/Avatar";
import ErrorPage from "next/error";
import Comment from "../../Components/Comments/Comment";
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";
import { useData } from "../../Context/DataContext";
import Comments from "../../Components/Comments/Comments";

const Post = ({ buzz, comms }) => {
  const router = useRouter();
  const [buzzDetails, setBuzzDetails] = useState(buzz);
  const [comments, setComments] = useState(comms);
  const [loading, setLoading] = useState(false);

  const { interactPostVote, getComments } = useData();
  const { isLoggedIn, currentUser } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) router.push("/");
  }, [isLoggedIn]);

  useEffect(() => {
    async function loopComments() {
      await getComments(buzzDetails?.buzzid, setComments);
    }
    const loadComments = setInterval(loopComments, 5000);
    return () => clearInterval(loadComments);
  }, []);

  const variants = {
    closed: {
      x: 100,
      opacity: 0,
    },
    open: (i) => ({
      x: 0,
      opacity: 1,
    }),
    hover: { scale: 1.1 },
    tap: {
      opacity: 0.9,
    },
  };

  const tapVariants = {
    closed: { rotate: 0, scale: 1 },
    open: ({ loading, value }) => ({
      rotate: loading ? value : 0,
      scale: loading ? 1.5 : 1,
    }),
    hover: { scale: 1 },
    tap: ({ value }) => ({
      rotate: value,
      scale: 1.4,
    }),
  };

  const childVariants = {
    closed: { rotate: 0, scale: 1 },
    open: (show) => ({
      stroke: show ? "#F45B49" : "#242424",
      fill: show ? "#F45B49" : "#ffffff",
    }),
    hover: { scale: 1 },
    tap: { scale: 1 },
  };

  const like = (
    <motion.svg
      variants={tapVariants}
      custom={{ loading, value: -30 }}
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M12.7053 7.25035L12.4825 8.11642L13.3741 8.18501L20.681 8.74707C21.4116 8.81544 21.8691 9.31259 21.8691 9.87471V13.2393L20.3668 19.8254L20.3646 19.8352L20.3626 19.8451C20.2375 20.4701 19.8852 20.7497 19.4466 20.7497H11.1063C11.1062 20.7497 11.1062 20.7497 11.1062 20.7497C10.7837 20.7497 10.4634 20.6976 10.1575 20.5956L10.1574 20.5955L6.58081 19.4035L6.58069 19.4035C6.27481 19.3016 5.95451 19.2497 5.63211 19.2497C5.63205 19.2497 5.632 19.2497 5.63194 19.2497H0.869141V11.0007H5.25805H5.25851C5.45061 11.0005 5.63946 10.9512 5.8071 10.8574C5.97247 10.7649 6.11176 10.6321 6.21208 10.4715L12.0315 1.34351L13.2423 1.68728C13.6078 1.80222 13.7313 1.94688 13.788 2.07053C13.8599 2.22752 13.9026 2.52379 13.7805 3.07103L12.7053 7.25035Z"
        strokeWidth="1.5"
        variants={childVariants}
        custom={buzzDetails?.interaction?.upvote_ids?.some(
          (vote) => vote === currentUser?.user_details?.id
        )}
        // stroke="#343434"
      />
    </motion.svg>
  );

  const dislike = (
    <motion.svg
      variants={tapVariants}
      custom={{ loading, value: 30 }}
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M10.033 14.7499L10.2558 13.8838L9.36416 13.8152L2.05732 13.2532C1.3267 13.1848 0.86914 12.6877 0.86914 12.1255L0.86914 8.76093L2.37145 2.17483L2.37368 2.16504L2.37565 2.1552C2.50073 1.53013 2.85306 1.25053 3.29164 1.25053L11.632 1.25053C11.632 1.25053 11.6321 1.25053 11.6321 1.25053C11.9545 1.25059 12.2749 1.30263 12.5807 1.40465L12.5809 1.40471L16.1575 2.59674L16.1576 2.59678C16.4635 2.69867 16.7838 2.75058 17.1062 2.75053C17.1062 2.75053 17.1063 2.75053 17.1063 2.75053L21.8691 2.75053L21.8691 10.9996L17.4802 10.9996L17.4798 10.9996C17.2877 10.9997 17.0988 11.049 16.9312 11.1428C16.7658 11.2353 16.6265 11.3681 16.5262 11.5288L10.7068 20.6567L9.49603 20.313C9.13053 20.198 9.00694 20.0534 8.95031 19.9297C8.87842 19.7727 8.83572 19.4765 8.95777 18.9292L10.033 14.7499Z"
        // stroke="#242424"
        strokeWidth="2"
        variants={childVariants}
        custom={buzzDetails?.interaction?.downvote_ids?.some(
          (vote) => vote === currentUser?.user_details?.id
        )}
      />
    </motion.svg>
  );

  const comment = (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.846964 19.7937L0.847006 19.7937L2.85732 17.7833L3.34841 17.2922L2.90882 16.7545C1.54793 15.0898 0.794061 13.0116 0.771212 10.8616C0.748362 8.71155 1.45789 6.61776 2.7831 4.92455C4.10831 3.23135 5.9703 2.03955 8.06284 1.54516C10.1554 1.05077 12.3539 1.28323 14.2967 2.20431C16.2396 3.12539 17.8112 4.68025 18.753 6.61316C19.6948 8.54608 19.9507 10.742 19.4787 12.8397C19.0067 14.9374 17.8349 16.812 16.1559 18.1552C14.477 19.4984 12.3909 20.2303 10.2408 20.2304C10.2408 20.2304 10.2408 20.2304 10.2408 20.2304L1.02785 20.2304V20.9982L1.02784 20.2304C0.97725 20.2304 0.927787 20.2154 0.885712 20.1873C0.843642 20.1592 0.810853 20.1193 0.791492 20.0725C0.77213 20.0258 0.767066 19.9743 0.776939 19.9247C0.786813 19.8751 0.811182 19.8295 0.846964 19.7937Z"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );

  const rebuzzz = (
    <svg
      width="22"
      height="21"
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.27911 16.3917H2.74361V5.13138H10.7282L9.90925 5.95031C9.70452 6.15505 9.60215 6.35978 9.60215 6.66688C9.60215 7.28108 10.0116 7.69054 10.6258 7.69054C10.9329 7.69054 11.1376 7.58817 11.3424 7.38344L13.9015 4.82429C14.311 4.41482 14.311 3.80062 13.9015 3.39116L11.3424 0.832001C10.9329 0.422536 10.3187 0.422536 9.90925 0.832001C9.49979 1.24147 9.49979 1.85566 9.90925 2.26513L10.7282 3.08406H1.71995C1.10575 3.08406 0.696289 3.49352 0.696289 4.10772V17.4153C0.696289 18.0295 1.10575 18.439 1.71995 18.439H4.27911C4.89331 18.439 5.30277 18.0295 5.30277 17.4153C5.30277 16.8011 4.89331 16.3917 4.27911 16.3917ZM20.1459 3.08406H17.5867C16.9725 3.08406 16.5631 3.49352 16.5631 4.10772C16.5631 4.72192 16.9725 5.13138 17.5867 5.13138H19.1222V16.3917H10.5234L11.3424 15.5727C11.7518 15.1633 11.7518 14.5491 11.3424 14.1396C10.9329 13.7301 10.3187 13.7301 9.90925 14.1396L7.3501 16.6988C6.94063 17.1082 6.94063 17.7224 7.3501 18.1319L9.90925 20.6911C10.114 20.8958 10.3187 20.9982 10.6258 20.9982C10.9329 20.9982 11.1376 20.8958 11.3424 20.6911C11.7518 20.2816 11.7518 19.6674 11.3424 19.2579L10.5234 18.439H20.1459C20.7601 18.439 21.1695 18.0295 21.1695 17.4153V4.10772C21.1695 3.49352 20.7601 3.08406 20.1459 3.08406Z"
        fill="black"
      />
    </svg>
  );

  const interactions = [
    {
      id: 1,
      icon: like,
      label:
        buzzDetails?.interaction?.upvoted_count === 1 ? "upvote" : "upvotes",
      count: buzzDetails?.interaction?.upvoted_count,
      classes: "likes",
      onClick: async () => {
        setLoading(true);
        await interactPostVote("upvote", buzzDetails.buzzid, setBuzzDetails);
        setLoading(false);
      },
    },
    {
      id: 4,
      icon: dislike,
      label:
        buzzDetails?.interaction?.downvoted_count === 1
          ? "downvote"
          : "downvotes",
      count: buzzDetails?.interaction?.downvoted_count,
      classes: "likes",
      classes: "likes",
      onClick: async () => {
        setLoading(true);
        await interactPostVote("downvote", buzzDetails.buzzid, setBuzzDetails);
        setLoading(false);
      },
    },
    // {
    //   id: 2,
    //   icon: comment,
    //   label: buzzDetails?.interaction?.commented_count === 1 ? "comment" : "comments",
    //   count: buzzDetails?.interaction?.commented_count,
    //   classes: "comments",
    // },
    {
      id: 3,
      icon: rebuzzz,
      label: "rebuzz",
      count: buzzDetails?.interaction?.rebuzzed_count,
      classes: "rebuzz",
    },
  ];

  return buzz ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.container}
      layout
    >
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
        className={styles.top}
      >
        <motion.h1 layoutId="header">Post View</motion.h1>
        <button className={styles.back} onClick={() => router.back()}>
          {cross}
        </button>
      </motion.div>

      <div className={styles.bottom}>
        {buzzDetails?.images?.length !== 0 && (
          <motion.div
            layoutId={buzzDetails.images[0].image}
            transition={{
              ease: [0.6, 0.01, -0.05, 0.95],
              duration: 0.4,
              delay: 0.1,
            }}
            className={styles.postImage}
          >
            <Image
              layout="fill"
              priority={true}
              objectFit="contain"
              className={styles.image}
              src={`${process.env.NEXT_PUBLIC_URL}${buzzDetails.images[0].image}`}
              // placeholder="blur"
              loading="eager"
            />
          </motion.div>
        )}
        <motion.div
          initial={{ x: 500, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              delay: 0.5,
              duration: 0.3,
            },
          }}
          exit={{ x: 500, opacity: 0 }}
          className={styles.postDetails}
        >
          <div className={styles.userInfo}>
            <Avatar
              id={buzzDetails.author.username}
              value={buzzDetails.author.persona}
              style={{ marginRight: "20px" }}
            />

            <h3
              // onClick={() => router.push("/buzzDetails/8")}
              className={styles.username}
            >
              {" "}
              {buzzDetails.author.username || "John Doe"}{" "}
            </h3>

            {/* <span className={styles.save}> {save} </span> */}
          </div>
          <p className={styles.postDesc}>
            {buzzDetails.content ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem dictum sit arcu id ac. Duis cras varius nisi, id porttitor. "}
          </p>
          <div className={styles.postInfo}>
            {interactions.map(
              ({ id, classes, icon, count, label, onClick }) => (
                <motion.span
                  onClick={onClick}
                  style={{ cursor: "pointer" }}
                  variants={variants}
                  initial="closed"
                  animate="open"
                  whileTap="tap"
                  whileHover="hover"
                  key={id}
                  className={styles[classes]}
                >
                  {icon}
                  {count} {label}
                </motion.span>
              )
            )}
          </div>
          <div className={styles.divider}></div>
          <Comments
            comments={comments}
            setComments={setComments}
            loading={loading}
            setLoading={setLoading}
            buzz={buzzDetails}
          />
        </motion.div>
      </div>

      {/* </a>
      </Link> */}
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.container}
      layout
    >
      <ErrorPage statusCode={404} />
    </motion.div>
  );
};

export default Post;

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/content/buzz/id=${params.buzzid}/detail`
    );
    const buzz = await res.json();
    if (buzz.error) throw buzz.error;
    const info = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/comment/buzz/id=${params.buzzid}/list`
    );
    const comms = await info.json();
    return { props: { buzz, comms } };
  } catch (error) {
    return { props: {} };
  }
}

const save = (
  <svg
    width="14"
    height="20"
    viewBox="0 0 14 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.0329 0.354248H3.52602C2.77941 0.354248 2.06339 0.650835 1.53546 1.17876C1.00753 1.70669 0.710945 2.42272 0.710945 3.16932V18.183C0.710288 18.3484 0.753335 18.511 0.835726 18.6543C0.918117 18.7977 1.03693 18.9167 1.18012 18.9994C1.32277 19.0818 1.48459 19.1251 1.6493 19.1251C1.81402 19.1251 1.97583 19.0818 2.11848 18.9994L7.27945 16.0154L12.4404 18.9994C12.5834 19.0805 12.7452 19.1225 12.9096 19.1214C13.074 19.1225 13.2358 19.0805 13.3788 18.9994C13.522 18.9167 13.6408 18.7977 13.7232 18.6543C13.8056 18.511 13.8486 18.3484 13.8479 18.183V3.16932C13.8479 2.42272 13.5514 1.70669 13.0234 1.17876C12.4955 0.650835 11.7795 0.354248 11.0329 0.354248ZM11.9712 16.5597L7.74863 14.1199C7.60598 14.0376 7.44416 13.9942 7.27945 13.9942C7.11473 13.9942 6.95292 14.0376 6.81027 14.1199L2.58766 16.5597V3.16932C2.58766 2.92045 2.68652 2.68178 2.8625 2.5058C3.03847 2.32983 3.27715 2.23096 3.52602 2.23096H11.0329C11.2817 2.23096 11.5204 2.32983 11.6964 2.5058C11.8724 2.68178 11.9712 2.92045 11.9712 3.16932V16.5597Z"
      fill="black"
    />
  </svg>
);

const cross = (
  <svg
    width="15"
    height="15"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.9379 13.0002L24.8962 4.06272C25.2885 3.67042 25.5089 3.13835 25.5089 2.58356C25.5089 2.02876 25.2885 1.49669 24.8962 1.10439C24.5039 0.712091 23.9718 0.491699 23.417 0.491699C22.8622 0.491699 22.3302 0.712091 21.9379 1.10439L13.0004 10.0627L4.06286 1.10439C3.67056 0.712091 3.13849 0.491699 2.58369 0.491699C2.0289 0.491699 1.49683 0.712091 1.10453 1.10439C0.712228 1.49669 0.491837 2.02876 0.491837 2.58356C0.491837 3.13835 0.712228 3.67042 1.10453 4.06272L10.0629 13.0002L1.10453 21.9377C0.90926 22.1314 0.754273 22.3618 0.648505 22.6157C0.542736 22.8696 0.488281 23.1419 0.488281 23.4169C0.488281 23.6919 0.542736 23.9642 0.648505 24.2181C0.754273 24.472 0.90926 24.7024 1.10453 24.8961C1.2982 25.0913 1.52862 25.2463 1.78249 25.3521C2.03637 25.4578 2.30867 25.5123 2.58369 25.5123C2.85872 25.5123 3.13102 25.4578 3.3849 25.3521C3.63877 25.2463 3.86919 25.0913 4.06286 24.8961L13.0004 15.9377L21.9379 24.8961C22.1315 25.0913 22.362 25.2463 22.6158 25.3521C22.8697 25.4578 23.142 25.5123 23.417 25.5123C23.6921 25.5123 23.9644 25.4578 24.2182 25.3521C24.4721 25.2463 24.7025 25.0913 24.8962 24.8961C25.0915 24.7024 25.2465 24.472 25.3522 24.2181C25.458 23.9642 25.5124 23.6919 25.5124 23.4169C25.5124 23.1419 25.458 22.8696 25.3522 22.6157C25.2465 22.3618 25.0915 22.1314 24.8962 21.9377L15.9379 13.0002Z"
      fill="#4F4F4F"
    />
  </svg>
);
