import { Link } from "react-router-dom";

const Customers = ({ customers }) => {
  return (
    <div>
      <ul>
        {customers.map((customer, i) => (
          <li key={i}>
            <p className="cus-name">{customer.name}</p>
            <p className="cus-email">{customer.email}</p>
            <Link to={`customer/${customer._id}`} className="btn-view">View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Customers;