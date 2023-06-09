import { Link } from "react-router-dom";
import Moment from "react-moment";
import { motion, AnimatePresence } from "framer-motion";

const Histories = ({ histories }) => {
  return (
    <div>
      <ul>
        <AnimatePresence>
          {histories.map((history, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ease: "easeOut", duration: 1.5 }}
            >
              <li key={i}>
                <p className="history-date"><Moment format="DD-MM-YYYY" >{history.date}</Moment></p>
                <p className="history-info">{history.info}</p>
                <Link to={`/history-update/${history._id}`} className="btn btn-view btn-update update-history">Edit</Link>
              </li>
            </motion.div>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default Histories;