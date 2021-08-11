import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../styles/Modals/Modal.module.scss";
import Notification from "../Utils/Notification";
import Error from "../Utils/Error";
import { useAuth } from "../../Context/AuthContext";
import ButtonLoader from "../Utils/ButtonLoader";

const backdrop = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: [0.66, -0.47, 0.5, 1.52] },
  },
  exit: { opacity: 0 },
};

const modal = {
  hidden: { y: -500, opacity: 0 },
  visible: {
    y: 150,
    opacity: 1,
    transition: { delay: 0.3, duration: 0.5 },
  },
  exit: { y: -500 },
};

const ForgotPasswordModal = ({ visible, setVisible, setLoginVisible }) => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const { setIsLoggedIn, setCurrentUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setError,
    clearErrors,
  } = useForm();

  const [tokenSent, setTokenSent] = useState(false);

  useEffect(() => {
    return () => {
      setNotification(null);
    };
  }, []);

  const watchEmail = watch("email");

  async function tokenSubmit(values) {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_URL}/api/auth/reset_password/send`;
    let config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    };

    try {
      const response = await fetch(url, config);
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        throw { detail: jsonResponse.error.detail };
      }

      if (jsonResponse.success) {
        console.log("aslknf");
        setTokenSent(true);
        setNotification(
          `A Reset Token has been sent to ${values.email} Copy and paste token here`
        );
      }
      console.log(jsonResponse);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err.detail) {
        setError("manual", {
          type: "manual",
          message: err.detail,
        });
        setTimeout(() => clearErrors("manual"), 3000);
      }
    }
  }

  async function confirmToken(values) {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_URL}/api/auth/reset_password/confirm`;
    let config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    };

    try {
      const response = await fetch(url, config);
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        throw { detail: jsonResponse.error.detail };
      }
      console.log(jsonResponse);
      if (jsonResponse.success) {
        setTokenSent(false);
        setNotification(`Password Reset successfully`);
        notif = setTimeout(() => {
          setNotification(null);
        }, 3000);
        reset();
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.detail) {
        setError("manual", {
          type: "manual",
          message: err.detail,
        });
        setTimeout(() => clearErrors("manual"), 3000);
      }
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.backdrop}
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div layout className={styles.modal} variants={modal}>
            <AnimatePresence exitBeforeEnter>
              {tokenSent ? (
                <motion.h1
                  key="token"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.4,
                      ease: "backInOut",
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    transition: {
                      duration: 0.4,
                      ease: "backInOut",
                      delay: 0.4,
                    },
                  }}
                  className={styles["modal-heading"]}
                >
                  Enter Token
                </motion.h1>
              ) : (
                <motion.h1
                  key="forgot"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.4,
                      ease: "backInOut",
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    transition: {
                      duration: 0.4,
                      ease: "backInOut",
                      delay: 0.4,
                    },
                  }}
                  className={styles["modal-heading"]}
                >
                  Forgot Password
                </motion.h1>
              )}
            </AnimatePresence>
            <Error
              visible={errors?.manual?.message}
              message={errors?.manual?.message}
              styles={styles}
            />
            <Notification
              message={notification}
              visible={notification}
              styles={styles}
              setNotification={setNotification}
            />
            <AnimatePresence exitBeforeEnter>
              {tokenSent ? (
                <motion.form
                  key="token sent"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.4,
                      ease: "backInOut",
                    },
                  }}
                  exit={{
                    opacity: 0,
                    x: -40,
                    transition: {
                      duration: 0.4,
                      ease: "backInOut",
                    },
                  }}
                  onSubmit={handleSubmit(confirmToken)}
                >
                  <motion.div className={styles.formGroup}>
                    <label htmlFor="token">Token</label>
                    <input
                      id="token"
                      name="token"
                      type="text"
                      {...register("token", {
                        required: {
                          value: true,
                          message: "You must enter your token",
                        },
                      })}
                      placeholder="Enter your token"
                    />
                    <span className={styles.error}>
                      {errors?.token?.message}
                    </span>
                  </motion.div>

                  <motion.div className={styles.formGroup}>
                    <label htmlFor="email">email</label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "You must enter your email",
                        },
                      })}
                      placeholder="Enter your email"
                    />
                    <span className={styles.error}>
                      {errors?.email?.message}
                    </span>
                  </motion.div>

                  <motion.div className={styles.formGroup}>
                    <label htmlFor="pass">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="pass"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "You must enter your password",
                        },
                      })}
                      placeholder={`Enter ${
                        watchEmail
                          ? `password for ${watchEmail}`
                          : "your password"
                      }`}
                    />
                    <span className={styles.error}>
                      {errors?.password?.message}
                    </span>
                  </motion.div>

                  <div className={styles.extra}>
                    <motion.div
                      className={styles.instead}
                      onClick={() => {
                        setVisible(false);
                        setLoginVisible(true);
                      }}
                    >
                      <span> Back to Login? </span>
                    </motion.div>
                    <motion.div
                      className={styles.instead}
                      onClick={() => {
                        setTokenSent(false);
                      }}
                    >
                      <span> Don't have the token? </span>
                    </motion.div>
                  </div>
                  <motion.div className={styles.submit}>
                    <ButtonLoader value="Reset Password" loading={loading} />
                  </motion.div>
                </motion.form>
              ) : (
                <motion.form
                  key="token unsent"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.4,
                      ease: "backInOut",
                    },
                  }}
                  exit={{
                    opacity: 0,
                    x: -40,
                    transition: {
                      duration: 0.4,
                      ease: "backInOut",
                    },
                  }}
                  onSubmit={handleSubmit(tokenSubmit)}
                >
                  <motion.div className={styles.formGroup}>
                    <label htmlFor="email">email</label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "You must enter your email",
                        },
                      })}
                      placeholder="Enter your email"
                    />
                    <span className={styles.error}>
                      {errors?.email?.message}
                    </span>
                  </motion.div>
                  <div className={styles.extra}>
                    <motion.div
                      className={styles.instead}
                      onClick={() => {
                        setVisible(false);
                        setLoginVisible(true);
                      }}
                    >
                      <span> Back to Login? </span>
                    </motion.div>
                    <motion.div
                      className={styles.instead}
                      onClick={() => {
                        setTokenSent(true);
                      }}
                    >
                      <span> Already Got A Token? </span>
                    </motion.div>
                  </div>
                  <motion.div className={styles.submit}>
                    <ButtonLoader value="Confirm" loading={loading} />
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>

            <span className={styles.cancel} onClick={() => setVisible(false)}>
              {cancel}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ForgotPasswordModal;

const cancel = (
  <svg
    width="51"
    height="51"
    viewBox="0 0 51 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M28.2626 25.7358L37.2209 16.7983C37.6132 16.406 37.8336 15.8739 37.8336 15.3192C37.8336 14.7644 37.6132 14.2323 37.2209 13.84C36.8286 13.4477 36.2965 13.2273 35.7417 13.2273C35.1869 13.2273 34.6549 13.4477 34.2626 13.84L25.3251 22.7983L16.3876 13.84C15.9953 13.4477 15.4632 13.2273 14.9084 13.2273C14.3536 13.2273 13.8215 13.4477 13.4292 13.84C13.0369 14.2323 12.8165 14.7644 12.8165 15.3192C12.8165 15.8739 13.0369 16.406 13.4292 16.7983L22.3876 25.7358L13.4292 34.6733C13.234 34.867 13.079 35.0974 12.9732 35.3513C12.8674 35.6052 12.813 35.8775 12.813 36.1525C12.813 36.4275 12.8674 36.6998 12.9732 36.9537C13.079 37.2076 13.234 37.438 13.4292 37.6316C13.6229 37.8269 13.8533 37.9819 14.1072 38.0877C14.3611 38.1934 14.6334 38.2479 14.9084 38.2479C15.1834 38.2479 15.4557 38.1934 15.7096 38.0877C15.9635 37.9819 16.1939 37.8269 16.3876 37.6316L25.3251 28.6733L34.2626 37.6316C34.4562 37.8269 34.6867 37.9819 34.9405 38.0877C35.1944 38.1934 35.4667 38.2479 35.7417 38.2479C36.0168 38.2479 36.2891 38.1934 36.5429 38.0877C36.7968 37.9819 37.0272 37.8269 37.2209 37.6316C37.4162 37.438 37.5712 37.2076 37.6769 36.9537C37.7827 36.6998 37.8372 36.4275 37.8372 36.1525C37.8372 35.8775 37.7827 35.6052 37.6769 35.3513C37.5712 35.0974 37.4162 34.867 37.2209 34.6733L28.2626 25.7358Z"
      fill="#4F4F4F"
    />
  </svg>
);

{
  /* <motion.div className={styles.formGroup}>
  <label htmlFor="pass">Password</label>
  <input
    type="password"
    name="password"
    id="pass"
    {...register("password", {
      required: {
        value: true,
        message: "You must enter your password",
      },
    })}
    placeholder={`Enter ${
      watchEmail ? `password for ${watchEmail}` : "your password"
    }`}
  />
  <span className={styles.error}>{errors?.password?.message}</span>
</motion.div>; */
}
