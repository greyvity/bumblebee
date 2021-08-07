import { AnimatePresence, motion } from "framer-motion";
import styles from "../../styles/Post.module.scss";
import Comment from "./Comment";

const comments = [
  {
    id: 1,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem dictum sit arcu id ac. Duis cras varius nisi, id porttitor. ",
    user: "John Doe",
    persona: 1,
  },
  {
    id: 2,
    comment: "Hello User",
    user: "John Doe",
    persona: 1,
  },
  {
    id: 3,
    comment: "Hello User",
    user: "John Doe",
    persona: 1,
  },
];

const Comments = ({ data }) => {
  return (
    <AnimatePresence>
      <motion.div className={styles.comments}>
        {comments.map((comment) => (
          <Comment item={comment} key={comment.id} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default Comments;
