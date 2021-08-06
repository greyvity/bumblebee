import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useEffect, useState } from "react";
import MayKnow from "../Components/Suggestions/MayKnow";
import Notifications from "../Components/Notifications/Notifications";
// import OnYourMind from "../Components/OnYourMind";
import Search from "../Components/Search";
import { DataProvider } from "../Context/DataContext";
import Sidebar from "../Layout/Sidebar";
import "../styles/globals.css";
import { AuthProvider } from "../Context/AuthContext";

function MyApp({ Component, pageProps, router }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      if (url === "/home") setShow(true);
      else {
        setShow(false);
      }
    };
    const handleStop = () => {
      // NProgress.done();
      console.log("stopped");
    };
    console.log(router);
    handleStart(router.route);

    console.log("hi");

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <AuthProvider>
      <DataProvider>
        <AnimateSharedLayout type="crossfade">
          <motion.div
            variants={{
              initial: { opacity: 0 },
              animate: {
                opacity: 1,
                transition: {
                  staggerChildren: 5,
                },
              },
            }}
            initial="initial"
            animate="animate"
            layout
            className="main"
          >
            {/* <OnYourMind /> */}
            <Component {...pageProps} key={router.route} />
            <AnimatePresence>
              {show && (
                <>
                  <Sidebar />
                  <Search />
                  <Notifications />
                  <MayKnow />
                </>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimateSharedLayout>
      </DataProvider>
    </AuthProvider>
  );
}

export default MyApp;
