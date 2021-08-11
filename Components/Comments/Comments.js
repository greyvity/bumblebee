import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useData } from "../../Context/DataContext";
import styles from "../../styles/Post.module.scss";
import Comment from "./Comment";

const variants = {
  closed: {
    x: 100,
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
      delay: 0.6,
    },
  },
};

const Comments = ({ comments, setComments, loading, setLoading, buzz }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { comment, deleteComment } = useData();

  async function onSubmitForm(values) {
    setLoading(true);
    const res = await comment(values, buzz.buzzid, setComments);
    if (res.success) {
      reset();
    }
    setLoading(false);
  }

  const handleDeleteComment = async (commentid) => {
    setLoading(true);
    const res = await deleteComment(commentid, buzz.buzzid, setComments);
    setLoading(false);
  };

  return (
    <>
      <h1 className={styles.header}>Comments ({comments?.length})</h1>
      <div className={styles.asd}>
        <motion.ul
          initial="closed"
          animate="open"
          className={styles.ul}
          variants={variants}
        >
          <AnimatePresence>
            {comments?.map((comment) => (
              <Comment
                i={comment.commentid}
                handleDeleteComment={handleDeleteComment}
                key={comment.commentid}
                item={comment}
              />
            ))}
          </AnimatePresence>
        </motion.ul>
        <div className={styles.commentInput}></div>
      </div>
      <motion.form
        className={styles.form}
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <motion.div className={styles.formGroup}>
          <input
            id="content"
            name="content"
            type="text"
            {...register("content", {
              required: {
                value: true,
                message: "Comment Field is Empty",
              },
            })}
            placeholder="Type your comment"
          />
          <span className={styles.error}>{errors?.content?.message}</span>
          <motion.button type="submit" className={styles.submit}>
            {send}
          </motion.button>
        </motion.div>
      </motion.form>
    </>
  );
};

export default Comments;

const send = (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.1142 10.1468L7.11417 3.14679C6.56166 2.8718 5.93779 2.7739 5.32761 2.86644C4.71743 2.95898 4.15063 3.23746 3.7045 3.6639C3.25838 4.09035 2.95463 4.64401 2.83467 5.2494C2.71471 5.85479 2.78437 6.48244 3.03417 7.04679L5.43417 12.4168C5.48863 12.5466 5.51668 12.686 5.51668 12.8268C5.51668 12.9676 5.48863 13.107 5.43417 13.2368L3.03417 18.6068C2.83087 19.0635 2.74493 19.5638 2.78415 20.0622C2.82337 20.5605 2.98652 21.0412 3.25876 21.4605C3.53099 21.8798 3.9037 22.2244 4.343 22.463C4.78229 22.7016 5.27426 22.8267 5.77417 22.8268C6.2424 22.8221 6.70366 22.7128 7.12417 22.5068L21.1242 15.5068C21.6208 15.257 22.0382 14.8741 22.3299 14.4009C22.6215 13.9276 22.776 13.3827 22.776 12.8268C22.776 12.2709 22.6215 11.7259 22.3299 11.2527C22.0382 10.7795 21.6208 10.3966 21.1242 10.1468H21.1142ZM20.2242 13.7168L6.22417 20.7168C6.04034 20.8051 5.8339 20.835 5.63256 20.8026C5.43121 20.7703 5.24458 20.6771 5.09769 20.5356C4.95079 20.3942 4.85065 20.2112 4.8107 20.0112C4.77075 19.8112 4.7929 19.6038 4.87417 19.4168L7.26417 14.0468C7.29511 13.9751 7.32183 13.9016 7.34417 13.8268H14.2342C14.4994 13.8268 14.7537 13.7214 14.9413 13.5339C15.1288 13.3464 15.2342 13.092 15.2342 12.8268C15.2342 12.5616 15.1288 12.3072 14.9413 12.1197C14.7537 11.9321 14.4994 11.8268 14.2342 11.8268H7.34417C7.32183 11.752 7.29511 11.6785 7.26417 11.6068L4.87417 6.23679C4.7929 6.04975 4.77075 5.84234 4.8107 5.64236C4.85065 5.44238 4.95079 5.25939 5.09769 5.11794C5.24458 4.97648 5.43121 4.88332 5.63256 4.85094C5.8339 4.81856 6.04034 4.84852 6.22417 4.93679L20.2242 11.9368C20.388 12.0207 20.5254 12.1482 20.6214 12.3052C20.7174 12.4623 20.7682 12.6427 20.7682 12.8268C20.7682 13.0108 20.7174 13.1913 20.6214 13.3483C20.5254 13.5054 20.388 13.6329 20.2242 13.7168V13.7168Z"
      fill="black"
    />
  </svg>
);
