import { useState } from "react";
import jwt from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "./Notification";

const CreateCustomer = ({ createCustomer }) => {
  const [notification, setNotification] = useState({
    message: "",
    display: false,
    bgColor: ""
  });
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
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify({ userId: uId, name, email })
      });

      const data = await res.json();

      if (res.status === 200) {
        createCustomer(data.customer);
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
  );
}

export default CreateCustomer;