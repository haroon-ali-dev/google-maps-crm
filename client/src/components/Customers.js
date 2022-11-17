import { Link } from "react-router-dom";

const Customers = ({ customers }) => {
  return (
    <div>
      <ul>
        {customers.map((customer, i) => (
          <li key={i}>
            {customer.name} {customer.email}
            <Link to={`customer/${customer._id}`}>View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Customers;