import Avatar from "../Utils/Avatar";
import styles from "../../styles/Post.module.scss";
import { useEffect, useState } from "react";

const Comment = ({ item }) => {
  const [negative, setNegative] = useState(false);

  useEffect(() => {
    console.log(item.sentiment_value);
    if (item.sentiment_value < 0.5) setNegative(true);
  }, []);

  const handleToggleView = () => setNegative(!negative);

  return (
    <>
      <div className={styles.commentCard} onClick={handleToggleView}>
        {!negative ? (
          <>
            <div className={styles.profile}>
              <Avatar
                value={item.commenter.persona}
                style={{
                  borderRadius: "50%",
                  margin: "auto",
                  width: "37px",
                  height: "37px",
                }}
              />
            </div>
            <div className={styles.commentInfo}>
              <h3 className={styles.username}> {item.commenter.username} </h3>
              {item.content && <p className={styles.content}>{item.content}</p>}
            </div>
          </>
        ) : (
          <div className={styles.commentFiltered} onClick={handleToggleView}>
            <h3 className={styles.red}> {report} Click To Toggle View </h3>
            <p className={styles.content}>
              Comment Hidden <br /> sentiment value ={" "}
              <span className={styles.red}>
                {Number.parseFloat(item.sentiment_value).toPrecision(4)}
              </span>
            </p>
          </div>
        )}
      </div>
      <div className={styles.divider}></div>
    </>
  );
};

export default Comment;

const report = (
  <svg
    width="22"
    height="23"
    viewBox="0 0 22 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.75333 3.10261C10.3777 2.74215 11.1469 2.74215 11.7712 3.10261L17.8184 6.59395C18.4427 6.95441 18.8273 7.62057 18.8273 8.34149V15.3242C18.8273 16.0451 18.4427 16.7113 17.8184 17.0717L11.7712 20.5631C11.1469 20.9235 10.3777 20.9235 9.75333 20.5631L3.70615 17.0717C3.08181 16.7113 2.69721 16.0451 2.69721 15.3242V8.34149C2.69721 7.62057 3.08181 6.95441 3.70615 6.59395L9.75333 3.10261Z"
      stroke="#FF0000"
      strokeWidth="1.34526"
    />
    <path
      d="M10.7622 7.12451V14.0242"
      stroke="#FF0000"
      strokeWidth="1.34526"
      strokeLinecap="round"
    />
    <circle cx="10.762" cy="16.5413" r="0.672628" fill="#FF0000" />
  </svg>
);
