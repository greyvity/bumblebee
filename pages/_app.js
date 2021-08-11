import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useEffect, useState } from "react";
import MayKnow from "../Components/Suggestions/MayKnow";
import Notifications from "../Components/Notifications/Notifications";
// import OnYourMind from "../Components/OnYourMind";
import Search from "../Components/Search";
import { AssetsProvider } from "../Context/AssetsContext";
import Sidebar from "../Layout/Sidebar";
import "../styles/globals.css";
import { AuthProvider } from "../Context/AuthContext";
import { DataProvider } from "../Context/DataContext";

function MyApp({ Component, pageProps, router }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      if (
        url === "/home" ||
        url.split("/")[1] === "profile" ||
        url.split("/")[1] === "search"
      )
        setShow(true);
      else {
        setShow(false);
      }
    };
    const handleStop = () => {
      // NProgress.done();
    };
    handleStart(router.route);

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
        <AssetsProvider>
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
              style={{}}
            >
              <div className="main">
                {/* <OnYourMind /> */}
                <Component
                  setShow={setShow}
                  {...pageProps}
                  key={router.route}
                />
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
              </div>
            </motion.div>
          </AnimateSharedLayout>
        </AssetsProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default MyApp;
