import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CreateHistory from "./CreateHistory";
import Histories from "./Histories";

const RouteCustomer = () => {
  const { cId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [histories, setHistories] = useState([]);

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

    const getHistories = async () => {
      const res = await fetch(`http://localhost:3001/api/histories/customer/${cId}`);

      const data = await res.json();
      if (data.message === "success") {
        setHistories(data.histories);
      } else {
        alert(data.message);
      }
    }

    getHistories();
  }, [cId]);

  const createHistory = (history) => {
    setHistories([...histories, history]);
  }

  return (
    <div className="cont-cust-page">
      <p className="cus-name">Name: {name}</p>
      <p className="cus-email" style={{ marginBottom: "30px" }}>Email: {email}</p>
      <Link to={`/customer-update/${cId}`} className="btn btn-add btn-update">Edit</Link>

      <h2 className="sub-heading">History</h2>
      <CreateHistory cId={cId} createHistory={createHistory} />
      <Histories histories={histories} />
    </div>
  );
}

export default RouteCustomer;