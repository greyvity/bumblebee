import styles from "../../styles/Feed.module.scss";
import CardItem from "./CardItem";
import { motion } from "framer-motion";

const data = [
  {
    id: 1,
    name: "John Doe",
    post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem dictum sit arcu id ac. Duis cras varius nisi, id porttitor. ",
    image: "/sunset.png",
    likes: "2k",
    numComments: "1k",
    rebuzz: 20,
  },
  {
    id: 2,
    name: "John Doe",
    post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem dictum sit arcu id ac. Duis cras varius nisi, id porttitor. Turpis fermentum tellus mauris ut enim sed nunc, nulla arcu. Rhoncus, ultricies hac amet, libero quam. Pulvinar viverra ultrices lorem augue. Turpis nunc, nisl vulputate est venenatis tellus arcu semper et. Vehicula sed nisl, amet donec dui pharetra lorem dignissim lacus. Cras sed massa cras nulla pretium ut. Sem egestas ac scelerisque tempor sed eu libero cras. Luctus nunc amet at mi etiam viverra gravida. Id malesuada at integer odio.",
    image: null,
    likes: "2k",
    numComments: "1k",
    rebuzz: 20,
  },
  {
    id: 3,
    name: "John Doe",
    post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem dictum sit arcu id ac. Duis cras varius nisi, id porttitor. Turpis fermentum tellus mauris ut enim sed nunc, nulla arcu. Rhoncus, ultricies hac amet, libero quam. Pulvinar viverra ultrices lorem augue. Turpis nunc, nisl vulputate est venenatis tellus arcu semper et. Vehicula sed nisl, amet donec dui pharetra lorem dignissim lacus. Cras sed massa cras nulla pretium ut. Sem egestas ac scelerisque tempor sed eu libero cras. Luctus nunc amet at mi etiam viverra gravida. Id malesuada at integer odio.",
    image: null,
    likes: "2k",
    numComments: "1k",
    rebuzz: 20,
  },
  {
    id: 4,
    name: "John Doe",
    post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem dictum sit arcu id ac. Duis cras varius nisi, id porttitor. Turpis fermentum tellus mauris ut enim sed nunc, nulla arcu. Rhoncus, ultricies hac amet, libero quam. Pulvinar viverra ultrices lorem augue. Turpis nunc, nisl vulputate est venenatis tellus arcu semper et. Vehicula sed nisl, amet donec dui pharetra lorem dignissim lacus. Cras sed massa cras nulla pretium ut. Sem egestas ac scelerisque tempor sed eu libero cras. Luctus nunc amet at mi etiam viverra gravida. Id malesuada at integer odio.",
    image: null,
    likes: "2k",
    numComments: "1k",
    rebuzz: 20,
  },
];

const Feed = () => {
  return (
    <motion.div
      // initial={{ y: 500, opacity: 0 }}
      // animate={{
      //   y: 0,
      //   opacity: 1,
      //   transition: {
      //     delay: 0.35,
      //   },
      // }}
      // exit={{ y: 500, opacity: 0 }}
      className={styles.wrapper}
    >
      <div className={styles.container}>
        <h1 className={styles.title}>News Feed</h1>
        {data.map((post) => (
          <CardItem key={post.id} post={post} />
        ))}
      </div>
    </motion.div>
  );
};

export default Feed;

const image = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.6585 0.443604C12.394 0.445241 10.1613 0.977178 8.13936 1.99681C6.11738 3.01644 4.36228 4.49542 3.01464 6.31529C1.66701 8.13516 0.76429 10.2453 0.378798 12.4768C-0.0066937 14.7083 0.135754 16.999 0.79473 19.1655C0.786333 19.2135 0.786333 19.2626 0.79473 19.3106C1.34111 21.0679 2.22262 22.7029 3.39057 24.1252L0.49019 27.0256C0.288965 27.2295 0.152653 27.4885 0.0984536 27.7698C0.0442541 28.0511 0.0745959 28.3422 0.185651 28.6063C0.308833 28.8744 0.510883 29.0986 0.764822 29.2489C1.01876 29.3992 1.31251 29.4684 1.60684 29.4474H14.6585C17.6853 29.4451 20.6355 28.4959 23.0957 26.7327C25.5559 24.9695 27.4027 22.4807 28.3773 19.6151V19.4991C28.8827 18.0335 29.1472 16.4957 29.1604 14.9455C29.1604 13.0411 28.7853 11.1553 28.0565 9.39586C27.3277 7.63641 26.2595 6.03773 24.9129 4.69111C23.5663 3.34448 21.9676 2.27628 20.2082 1.54749C18.4487 0.818706 16.5629 0.443604 14.6585 0.443604V0.443604ZM14.6585 26.547H5.10179L5.53685 26.1264L17.7329 13.9159C18.004 13.6501 18.3685 13.5013 18.7481 13.5013C19.1277 13.5013 19.4921 13.6501 19.7632 13.9159L25.0129 19.1365L25.3464 19.4556C24.4595 21.5575 22.9726 23.3513 21.0716 24.6126C19.1706 25.8739 16.9399 26.5468 14.6585 26.547ZM3.84013 19.1075L6.13142 16.8162C6.40313 16.5461 6.77069 16.3945 7.15381 16.3945C7.53693 16.3945 7.90448 16.5461 8.17619 16.8162L9.43785 18.0779L5.49334 22.0514C4.79568 21.16 4.23819 20.1672 3.84013 19.1075V19.1075ZM26.1875 16.2072L21.837 11.8566C21.0212 11.0419 19.9155 10.5842 18.7626 10.5842C17.6097 10.5842 16.5039 11.0419 15.6882 11.8566L11.4971 16.0476L10.221 14.786C9.40582 13.9757 8.30316 13.5209 7.15381 13.5209C6.00445 13.5209 4.90179 13.9757 4.08666 14.786L3.05702 15.7576C3.04258 15.4871 3.04258 15.216 3.05702 14.9455C3.05702 11.8686 4.27932 8.91769 6.45503 6.74198C8.63073 4.56628 11.5816 3.34398 14.6585 3.34398C17.7354 3.34398 20.6863 4.56628 22.862 6.74198C25.0377 8.91769 26.26 11.8686 26.26 14.9455C26.2817 15.3609 26.2817 15.7772 26.26 16.1927L26.1875 16.2072Z"
      fill="black"
    />
  </svg>
);
