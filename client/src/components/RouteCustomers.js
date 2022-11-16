import { useState } from "react";
import CreateCustomer from "./CreateCustomer";
import Customers from "./Customers";

const RouteCustomers = () => {
  const [customers, setCustomers] = useState([]);

  const createCustomer = (customer) => {
    setCustomers([...customers, customer]);
  }

  return (
    <div>
      <CreateCustomer createCustomer={createCustomer} />
      <Customers customers={customers} />
    </div>
  );
}

export default RouteCustomers;