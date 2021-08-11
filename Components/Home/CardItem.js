import styles from "../../styles/Feed.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Avatar from "../Utils/Avatar";
import { useData } from "../../Context/DataContext";
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";

const CardItem = ({ post, setFeed, temp }) => {
  const { currentUser } = useAuth();
  const { deleteBuzz, editBuzz, interactPostVote } = useData();
  const [liked, setLiked] = useState(false);
  const [disLiked, setDisLiked] = useState(false);
  const [count, setCount] = useState({ likes: 0, dislikes: 0 });

  useEffect(() => {
    if (post) {
      if (
        post?.interaction?.upvote_ids?.some(
          (vote) => vote === currentUser?.user_details?.id
        )
      ) {
        setLiked(true);
        setDisLiked(false);
      } else if (
        post?.interaction?.downvote_ids?.some(
          (vote) => vote === currentUser?.user_details?.id
        )
      ) {
        setDisLiked(true);
        setLiked(false);
      } else {
        setDisLiked(false);
        setLiked(false);
      }
    }
  }, [post]);

  useEffect(() => {
    if (post) {
      const likes = post?.interaction?.upvoted_count;
      const dislikes = post?.interaction?.downvoted_count;
      setCount({ likes, dislikes });
    }
  }, [post]);

  const like = (
    <motion.svg
      whileTap={{
        rotate: -30,
        scale: 1.5,
      }}
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M12.7053 7.25035L12.4825 8.11642L13.3741 8.18501L20.681 8.74707C21.4116 8.81544 21.8691 9.31259 21.8691 9.87471V13.2393L20.3668 19.8254L20.3646 19.8352L20.3626 19.8451C20.2375 20.4701 19.8852 20.7497 19.4466 20.7497H11.1063C11.1062 20.7497 11.1062 20.7497 11.1062 20.7497C10.7837 20.7497 10.4634 20.6976 10.1575 20.5956L10.1574 20.5955L6.58081 19.4035L6.58069 19.4035C6.27481 19.3016 5.95451 19.2497 5.63211 19.2497C5.63205 19.2497 5.632 19.2497 5.63194 19.2497H0.869141V11.0007H5.25805H5.25851C5.45061 11.0005 5.63946 10.9512 5.8071 10.8574C5.97247 10.7649 6.11176 10.6321 6.21208 10.4715L12.0315 1.34351L13.2423 1.68728C13.6078 1.80222 13.7313 1.94688 13.788 2.07053C13.8599 2.22752 13.9026 2.52379 13.7805 3.07103L12.7053 7.25035Z"
        strokeWidth="2"
        stroke="#242424"
        animate={{
          stroke: liked ? "#F45B49" : "#242424",
          fill: liked ? "rgba(244, 91, 73, 1)" : "rgba(244, 91, 73, 0)",
        }}
      />
    </motion.svg>
  );

  const dislike = (
    <motion.svg
      whileTap={{
        rotate: 30,
        scale: 1.5,
      }}
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M10.033 14.7499L10.2558 13.8838L9.36416 13.8152L2.05732 13.2532C1.3267 13.1848 0.86914 12.6877 0.86914 12.1255L0.86914 8.76093L2.37145 2.17483L2.37368 2.16504L2.37565 2.1552C2.50073 1.53013 2.85306 1.25053 3.29164 1.25053L11.632 1.25053C11.632 1.25053 11.6321 1.25053 11.6321 1.25053C11.9545 1.25059 12.2749 1.30263 12.5807 1.40465L12.5809 1.40471L16.1575 2.59674L16.1576 2.59678C16.4635 2.69867 16.7838 2.75058 17.1062 2.75053C17.1062 2.75053 17.1063 2.75053 17.1063 2.75053L21.8691 2.75053L21.8691 10.9996L17.4802 10.9996L17.4798 10.9996C17.2877 10.9997 17.0988 11.049 16.9312 11.1428C16.7658 11.2353 16.6265 11.3681 16.5262 11.5288L10.7068 20.6567L9.49603 20.313C9.13053 20.198 9.00694 20.0534 8.95031 19.9297C8.87842 19.7727 8.83572 19.4765 8.95777 18.9292L10.033 14.7499Z"
        stroke="#242424"
        strokeWidth="2"
        animate={{
          stroke: disLiked ? "#F45B49" : "#242424",
          fill: disLiked ? "rgba(244, 91, 73, 1)" : "rgba(244, 91, 73, 0)",
        }}
      />
    </motion.svg>
  );

  const interactions = [
    {
      id: 1,
      icon: like,
      label: count.likes === 1 ? "upvote" : "upvotes",
      count: count.likes,
      classes: "likes",
      onClick: async (e) => {
        e.stopPropagation();
        const res = await interactPostVote("upvote", post?.buzzid);
        if (res.success) {
          if (disLiked) setDisLiked(false);
          setCount(({ likes, dislikes }) => {
            let temp = {
              likes: !liked ? likes + 1 : likes - 1,
              dislikes: disLiked ? dislikes - 1 : dislikes,
            };
            if (liked) {
              setLiked(false);
            } else setLiked(true);
            return temp;
          });
        }
      },
    },
    {
      id: 4,
      icon: dislike,
      label: count.dislikes === 1 ? "downvote" : "downvotes",
      count: count.dislikes,
      classes: "likes",
      onClick: async (e) => {
        e.stopPropagation();
        const res = await interactPostVote("downvote", post?.buzzid);
        if (res.success) {
          if (liked) setLiked(false);
          setCount(({ likes, dislikes }) => {
            let temp = {
              dislikes: !disLiked ? dislikes + 1 : dislikes - 1,
              likes: liked ? likes - 1 : likes,
            };
            if (disLiked) {
              setDisLiked(false);
            } else setDisLiked(true);
            return temp;
          });
        }
      },
    },
    {
      id: 2,
      icon: comment,
      label: post?.interaction?.commented_count === 1 ? "comment" : "comments",
      count: post?.interaction?.commented_count,
      classes: "comments",
    },
    {
      id: 3,
      icon: rebuzzz,
      label: "rebuzz",
      count: post?.interaction?.rebuzzed_count,
      classes: "rebuzz",
    },
  ];

  const handleDelete = async (e) => {
    e.stopPropagation();
    await deleteBuzz(post.buzzid, setFeed);
    if (temp) await temp();
  };

  const router = useRouter();

  return (
    <div
      className={styles.card}
      style={{ cursor: "pointer" }}
      onClick={() => router.push(`/buzz/${post.buzzid}`)}
    >
      <div className={styles.profileContainer}>
        {/* <div className={styles.profile}>{avatars[0]}</div> */}
        <Avatar
          id={post.author.username}
          value={post.author.persona}
          style={{ margin: "auto" }}
        />
      </div>
      <div className={styles.postContainer}>
        <motion.div layout className={styles.top}>
          <motion.h3
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/profile/${post.author.username}`);
            }}
            layout
            className={styles.username}
          >
            {post.author.username}
          </motion.h3>
          {post.author.username === currentUser?.user_details?.username && (
            <>
              <motion.span layout>{pen}</motion.span>
              <motion.span onClick={handleDelete} layout>
                {bin}
              </motion.span>
            </>
          )}
        </motion.div>
        <div className={styles.content}>
          {post.content && <p className={styles.postDesc}>{post.content}</p>}
          {post?.images?.length !== 0 && (
            <motion.div
              className={styles.imgContainer}
              layoutId={post?.images[0]?.image}
              // animate={{ x: 0 }}
              transition={{
                ease: [0.6, 0.01, -0.05, 0.95],
                duration: 0.4,
                delay: 0.1,
              }}
              onClick={() => router.push(`/buzz/${post.buzzid}`)}
            >
              <Image
                layout="fill"
                objectFit="cover"
                loading="eager"
                priority={true}
                src={`${process.env.NEXT_PUBLIC_URL}${post.images[0].image}`}
                className={styles.image}
              />
            </motion.div>
          )}
        </div>
        <div className={styles.info}>
          {interactions.map(({ id, classes, icon, count, label, onClick }) => (
            <motion.span
              style={{ cursor: "pointer" }}
              whileHover={{ scale: 1.05 }}
              key={id}
              className={styles[classes]}
              onClick={onClick}
            >
              {icon}
              {count} {label}
            </motion.span>
          ))}

          {/* <span className={styles.save}> {save} </span> */}
        </div>
      </div>
    </div>
  );
};

export default CardItem;

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
      strokeWidth="1.53549"
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

const parent2Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, scale: 2.5 },
  hover: {
    scale: 2.8,
    transition: {
      duration: 0.3,
    },
  },
};

const childVariants = {
  hidden: { x: 10, scale: 0 },
  visible: { x: 0, scale: 1 },
  hover: {
    scale: 1,
    rotate: 10,
    transition: {
      duration: 0.3,
      ease: [0.16, -0.5, 0.78, 1.43],
    },
  },
};

const child2Variants = {
  hidden: { x: 10, scale: 0 },
  visible: { x: 0, scale: 1 },
  hover: {
    scale: 0.9,
    y: -1,
    rotate: -10,
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

const bin = (
  <motion.svg
    variants={parent2Variants}
    initial="hidden"
    animate="visible"
    whileHover="hover"
    width="18"
    height="22"
    viewBox="0 0 30 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      variants={childVariants}
      d="M2.3877 6.28687V17.4963C2.3877 18.3071 2.68628 19.0847 3.21776 19.658C3.74924 20.2314 4.47008 20.5534 5.22171 20.5534H12.7791C13.5307 20.5534 14.2515 20.2314 14.783 19.658C15.3145 19.0847 15.6131 18.3071 15.6131 17.4963V6.28687"
      stroke="#F45B49"
      strokeWidth="2"
    />
    <motion.path
      variants={child2Variants}
      d="M16.884 5.44653H12.9418M12.9418 5.44653V4.44653C12.9418 3.65088 12.6303 2.88782 12.0758 2.32521C11.5213 1.7626 10.7693 1.44653 9.98514 1.44653H7.9356C7.15145 1.44653 6.47787 1.7626 5.92339 2.32521C5.36892 2.88782 5.05741 3.65088 5.05741 4.44653V5.44653M12.9418 5.44653H5.05741M5.05741 5.44653H1.11523"
      stroke="#F45B49"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </motion.svg>
);
