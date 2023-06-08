import { useState } from "react";
import Notification from "./Notification";

const RouteLogin = () => {
  const [notification, setNotification] = useState({
    message: "",
    display: "none",
    bgColor: ""
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.status === 200) {
        console.log(data.token);
      } else {
        setNotification({
          message: data.message,
          display: "block",
          bgColor: "#E2412E"
        });
      }
    } catch (error) {
      setNotification({
        message: error.message,
        display: "block",
        bgColor: "#E2412E"
      });
    } finally {
      setTimeout(() => {
        setNotification({
          message: "",
          display: "none",
          bgColor: "#E2412E"
        });
      }, 3000);
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
          <button className="btn btn-add" id="btn-add" type="submit">Login</button>
        </div>
      </form>
      <Notification
        message={notification.message}
        display={notification.display}
        bgColor={notification.bgColor}
      />
    </div>
  );
}

export default RouteLogin;