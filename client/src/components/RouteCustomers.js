import { useEffect, useState } from "react";
import CreateCustomer from "./CreateCustomer";
import Customers from "./Customers";
import jwt from "jwt-decode";
import { motion } from "framer-motion"

const RouteCustomers = () => {
  const [customers, setCustomers] = useState([]);

  const token = localStorage.getItem("token");
  const { uId } = jwt(token);

  useEffect(() => {
    const getCustomers = async () => {
      const res = await fetch(`http://localhost:3001/api/customers/user/${uId}`, {
        headers: { "x-auth-token": token }
      });
      const data = await res.json();

      if (data.message === "success") {
        setCustomers(data.customers);
      } else {
        alert(data.message);
      }
    }

    getCustomers();
  }, [token, uId]);

  const createCustomer = (customer) => {
    setCustomers([...customers, customer]);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: +200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeOut", duration: 1.5 }}
    >
      <div>
        <div className="cont">
          <CreateCustomer createCustomer={createCustomer} />
          <Customers customers={customers} />
        </div>
      </div>
    </motion.div>
  );
}

export default RouteCustomers;