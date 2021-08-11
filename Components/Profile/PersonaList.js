import { AnimatePresence, motion } from "framer-motion";
import { useAssets } from "../../Context/AssetsContext";
import styles from "../../styles/Persona.module.scss";
import Avatar from "../Utils/Avatar";

const PersonaList = ({ active, setActive }) => {
  const { avatarImgs } = useAssets();

  return (
    <motion.div className={styles.wrapper}>
      <motion.div layout className={styles.activePersona}>
        {/* <AnimatePresence exitBeforeEnter> */}
        <Avatar
          key={`${active}persona`}
          layoutId={active}
          // initial={{ x: 10, opacity: 0 }}
          // animate={{ x: 0, opacity: 1 }}
          // exit={{ x: 10, opacity: 0 }}
          value={active}
          style={{
            borderRadius: "50%",
            width: "120px",
            height: "120px",
            border: "6px solid black",
          }}
        />
        {/* </AnimatePresence> */}
      </motion.div>
      <div>
        <div className={styles.divider}></div>
      </div>
      <motion.div layout className={styles.carousel}>
        <motion.div layout className={styles.personaList}>
          {avatarImgs.map(
            (avatar, id) =>
              active !== id && (
                <Avatar
                  layout
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ x: -5, opacity: 0.9 }}
                  layoutId={id}
                  value={id}
                  key={`${id}234layout`}
                  route={false}
                  style={{
                    borderRadius: "50%",
                    width: "92px",
                    height: "92px",
                    border: "3px solid black",
                  }}
                  onClick={() => setActive(id)}
                />
              )
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PersonaList;
