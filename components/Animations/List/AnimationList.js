import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

const AnimationList = ({ children, className}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView])

  return (
  <motion.ul
    ref={ref}
    className={className}
    variants={container}
    initial="hidden"
    animate={controls}
  >
    {children}
  </motion.ul>
  )
}
  


export default AnimationList;