import { useEffect, useState } from "react";
import CreateCustomer from "./CreateCustomer";
import Customers from "./Customers";
import jwt from "jwt-decode";

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
    <div>
      <div className="cont">
        <CreateCustomer createCustomer={createCustomer} />
        <Customers customers={customers} />
      </div>
    </div>
  );
}

export default RouteCustomers;