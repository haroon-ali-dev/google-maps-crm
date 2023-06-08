import { useState } from "react";
import Notification from "./Notification";

const RouteRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.status === 200) {
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="cont">
      <form onSubmit={submit}>
        <div className="form-input-container">
          <label>
            Email
            <br />
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => { setEmail(e.target.value); }}
              minLength="3"
              maxLength="256"
              required />
          </label>
        </div>
        <div className="form-input-container">
          <label>
            Password
            <br />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); }}
              minLength="3"
              maxLength="15"
              required />
          </label>
        </div>
        <div className="form-submit-container">
          <button className="btn btn-add" id="btn-add" type="submit">Register</button>
        </div>
      </form>
      <Notification />
    </div>
  );
}

export default RouteRegister;