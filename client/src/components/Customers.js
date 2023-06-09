import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Customers = ({ customers }) => {
  return (
    <div>
      <ul>
        <AnimatePresence>
          {customers.map((customer, i) => (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ease: "easeOut", duration: 1.5 }}
            >
              <li key={i}>
                <p className="cus-name">{customer.name}</p>
                <p className="cus-email">{customer.email}</p>
                <Link to={`/customer/${customer._id}`} className="btn btn-view">View</Link>
              </li>
            </motion.div>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default Customers;