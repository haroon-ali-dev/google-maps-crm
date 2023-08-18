import { motion } from "framer-motion";

const Customers = ({ customers }) => {

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeOut", duration: 1.5 }}
    >
      
    </motion.div>
  );
}

export default Customers;