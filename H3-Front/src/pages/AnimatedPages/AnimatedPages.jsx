import { motion } from "framer-motion"
import PropTypes from "prop-types";


const animations = {
    initial: {opacity:0, x:-100},
    animate: {opacity:1, x:0},
    exit: {opacity:0, x:100}
}

const AnimatedPages = ({children}) => {
  return (
    <motion.div variants={animations} initial="initial" animate="animate" exit="exit" transition={{duration: 1}}>
      {children}
    </motion.div>
  )
}

AnimatedPages.propTypes = {
  children: PropTypes.node
};

export default AnimatedPages