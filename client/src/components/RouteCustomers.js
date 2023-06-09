import { useEffect, useState } from "react";
import CreateCustomer from "./CreateCustomer";
import Customers from "./Customers";

const RouteCustomers = () => {
  const [customers, setCustomers] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getCustomers = async () => {
      const res = await fetch("http://localhost:3001/api/customers", {
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
  }, [token]);

  const createCustomer = (customer) => {
    setCustomers([...customers, customer]);
  }

  return (
    <div>
      <div className="cont">
        <CreateCustomer createCustomer={createCustomer} />
        <Customers customers={customers} />
      </div>
    </div>
  );
}

export default RouteCustomers;