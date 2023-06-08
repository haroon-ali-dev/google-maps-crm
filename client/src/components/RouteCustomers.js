import { useEffect, useState } from "react";
import CreateCustomer from "./CreateCustomer";
import Customers from "./Customers";

const RouteCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const getCustomers = async () => {
      const res = await fetch("http://localhost:3001/api/customers");
      const data = await res.json();

      if (data.message === "success") {
        setCustomers(data.customers);
      } else {
        alert(data.message);
      }
    }

    getCustomers();
  }, []);

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