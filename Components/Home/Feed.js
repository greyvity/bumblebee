import styles from "../../styles/Feed.module.scss";
import CardItem from "./CardItem";
import { motion } from "framer-motion";
import { useData } from "../../Context/DataContext";

const Feed = ({ data, title, setFeed }) => {
  // const { feed } = useData();

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
        {data && data.length !== 0 ? (
          <h1 className={styles.title}>{title}</h1>
        ) : (
          <h1>No buzzes to show</h1>
        )}
        {data &&
          data?.map((post) => (
            <CardItem setFeed={setFeed} key={post.buzzid} post={post} />
          ))}
      </div>
    </motion.div>
  );
};

export default Feed;
