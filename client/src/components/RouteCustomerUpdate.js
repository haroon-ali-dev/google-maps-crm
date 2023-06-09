import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RouteCustomerUpdate = () => {
  const navigate = useNavigate();

  const { cId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getCustomerInfo = async () => {
      const res = await fetch(`http://localhost:3001/api/customers/${cId}`, {
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
  }, [cId, token]);

  const submit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      return alert("Please enter name and email.");
    }

    try {
      const res = await fetch(`http://localhost:3001/api/customers/${cId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify({ name, email })
      });

      const data = await res.json();
      if (data.message === "success") {
        navigate(`/customer/${cId}`);
      } else {
        alert(data.message);
      }

    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="cont">
      <form onSubmit={submit}>
        <div>
          <label>
            Name
            <input id="name" type="text" value={name} onChange={(e) => { setName(e.target.value); }} required />
          </label>
        </div>
        <div>
          <label>
            Email
            <input id="email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); }} required />
          </label>
        </div>
        <div>
          <button className="btn btn-add" id="btn-update" type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default RouteCustomerUpdate;