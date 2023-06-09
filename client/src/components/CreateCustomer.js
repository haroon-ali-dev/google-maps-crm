import { useState } from "react";
import jwt from "jwt-decode";

const CreateCustomer = ({ createCustomer }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const token = localStorage.getItem("token");
  const { uId } = jwt(token);

  const submit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      return alert("Please enter name and email.");
    }

    try {
      const res = await fetch("http://localhost:3001/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify({ userId: uId, name, email })
      });

      const data = await res.json();
      if (data.message === "success") {
        createCustomer(data.customer);
      } else {
        alert(data.message);
      }

    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div className="form-input-container">
          <label>
            Name
            <br />
            <input id="name" type="text" value={name} onChange={(e) => { setName(e.target.value); }} min="3" max="50" required />
          </label>
        </div>
        <div className="form-input-container">
          <label>
            Email
            <br />
            <input id="email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); }} min="3" max="256" required />
          </label>
        </div>
        <div className="form-submit-container">
          <button className="btn btn-add" id="btn-add" type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}

export default CreateCustomer;