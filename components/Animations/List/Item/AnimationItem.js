import React from "react";
import { motion } from "framer-motion";
import { Fragment } from "react/cjs/react.production.min";

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const AnimationItem = ({ children, index, className }) => {
    return (
        <motion.li key={index} className={className} variants={item}>{children}</motion.li>
    )
};

export default AnimationItem;