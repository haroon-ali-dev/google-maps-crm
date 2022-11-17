import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const RouteCustomer = () => {
  const { cId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getCustomerInfo = async () => {
      const res = await fetch(`http://localhost:3001/api/customers/${cId}`);

      const data = await res.json();
      if (data.message === "success") {
        setName(data.customer.name);
        setEmail(data.customer.email);
      } else {
        alert(data.message);
      }
    }

    getCustomerInfo();
  }, [cId]);

  return (
    <div>
      <p className="cus-name">Name: {name}</p>
      <p className="cus-email">Email: {email}</p>
      <Link to={`/customer-update/${cId}`} className="btn-edit">Edit</Link>
    </div>
  );
}

export default RouteCustomer;