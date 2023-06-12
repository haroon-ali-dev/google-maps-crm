import { AppContext } from "../App";
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import CreateHistory from "./CreateHistory";
import Histories from "./Histories";
import { motion } from "framer-motion";

const RouteCustomer = () => {
  const apiURL = useContext(AppContext);

  const { cId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [histories, setHistories] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getCustomerInfo = async () => {
      const res = await fetch(`${apiURL}/api/customers/${cId}`, {
        headers: { "x-auth-token": token }
      });

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
      const res = await fetch(`${apiURL}/api/histories/customer/${cId}`, {
        headers: { "x-auth-token": token }
      });

      const data = await res.json();
      if (data.message === "success") {
        setHistories(data.histories);
      } else {
        alert(data.message);
      }
    }

    getHistories();
  }, [cId, token, apiURL]);

  const createHistory = (history) => {
    setHistories([...histories, history]);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: +200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeOut", duration: 1.5 }}
    >
      <div className="cont-cust-page">
        <h2>{name}</h2>
        <p style={{ marginBottom: "20px" }}>{email}</p>
        <Link to={`/customer-update/${cId}`} className="btn btn-add btn-update">Edit</Link>

        <h2 className="sub-heading">History</h2>
        <CreateHistory cId={cId} createHistory={createHistory} />
        <Histories histories={histories} />
      </div>
    </motion.div>
  );
}

export default RouteCustomer;