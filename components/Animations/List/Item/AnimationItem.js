import { motion } from "framer-motion";

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const AnimationItem = ({ children, index, className }) => {
    return <motion.li className={className} variants={item}>{children}</motion.li>
};

export default AnimationItem;