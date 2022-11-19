import { Link } from "react-router-dom";
import Moment from "react-moment";

const Histories = ({ histories }) => {
  return (
    <div>
      <ul>
        {histories.map((history, i) => (
          <li key={i}>
            <p className="history-date"><Moment format="DD-MM-YYYY" >{history.date}</Moment></p>
            <p className="history-info">{history.info}</p>
            <Link to={`/history-update/${history._id}`} className="btn-view">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Histories;