import React from "react";
import { motion } from "framer-motion";

const AnimatedButton = ({ children }) => {
  return (
    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
      {children}
    </motion.div>
  );
};

export default AnimatedButton;
