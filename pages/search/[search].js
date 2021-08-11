import Head from "next/head";
import styles from "../../styles/SearchPage.module.scss";
import { motion } from "framer-motion";
import router from "next/router";
import { useAuth } from "../../Context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { useData } from "../../Context/DataContext";
import ErrorPage from "next/error";
import Users from "../../Components/Search/Users";
import CardItem from "../../Components/Home/CardItem";

export default function Landing() {
  const { isLoggedIn } = useAuth();

  const { search } = router.query;
  const { searchQuery } = useData();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) router.push("/");
  }, [isLoggedIn]);

  const temp = useCallback(async () => {
    setLoading(true);
    const res = await searchQuery(search);
    if (res?.success) {
      setResults(res.data);
    } else setResults(null);
    setLoading(false);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    if (search) temp();
  }, [search]);

  return (
    <>
      <Head>
        <title>BumbleBee - Search - {search}</title>
        <meta name="description" content="Search users, buzzes and more" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        layout
        className={styles.main}
      >
        {!loading ? (
          results ? (
            <div className={styles.searchContainer}>
              <h1 className={styles.pageHeader}>
                Showing Results for <strong>"{search}"</strong>
              </h1>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  Users <span>({results.users_count})</span>
                </h2>
                {results.users?.map(({ username, userid }) => (
                  <Users value={username} key={userid} />
                ))}
              </div>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  Buzzes <span>({results.buzzes_count})</span>
                </h2>
                {results.buzzes?.map((buzz) => (
                  <CardItem temp={temp} post={buzz} key={buzz.buzzid} />
                ))}
              </div>
            </div>
          ) : (
            <ErrorPage statusCode={404} />
          )
        ) : (
          "loading"
        )}
      </motion.main>
    </>
  );
}
