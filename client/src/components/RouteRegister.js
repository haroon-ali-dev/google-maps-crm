import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "./Notification";

const RouteRegister = () => {
  const [notification, setNotification] = useState({
    message: "",
    display: false,
    bgColor: ""
  });
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
        setEmail("");
        setPassword("");
        setNotification({
          message: data.message,
          display: true,
          bgColor: "#009379"
        });
      } else {
        setNotification({
          message: data.message,
          display: true,
          bgColor: "#E2412E"
        });
      }
    } catch (error) {
      setNotification({
        message: error.message,
        display: true,
        bgColor: "#E2412E"
      });
    } finally {
      setTimeout(() => {
        setNotification({
          message: "",
          display: false,
          bgColor: "#E2412E"
        });
      }, 3000);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut", duration: 1.5 }}
    >
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
        <AnimatePresence>
          {notification.display && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeOut", duration: 1.5 }}
              exit={{ opacity: 0 }}
            >
              <Notification
                message={notification.message}
                bgColor={notification.bgColor}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default RouteRegister;