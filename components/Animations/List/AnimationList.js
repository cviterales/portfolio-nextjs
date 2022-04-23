import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2
    }
  }
};

const AnimationList = ({ children, className, isVisible }) => {
  const controls = useAnimation();
  useEffect(() => {
    if (isVisible) controls.start("visible");
  }, [isVisible])

  return <motion.ul
    className={className}
    variants={container}
    initial="hidden"
    animate={controls}
  >
    {children}
  </motion.ul>
}



export default AnimationList;