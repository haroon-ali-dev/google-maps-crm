import { AppContext } from "../App";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwt from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "./Notification";

const RouteCustomerUpdate = () => {
  const apiURL = useContext(AppContext);
  const navigate = useNavigate();

  const [notification, setNotification] = useState({
    message: "",
    display: false,
    bgColor: ""
  });
  const { cId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const token = localStorage.getItem("token");
  const { uId } = jwt(token);

  useEffect(() => {
    const getCustomerInfo = async () => {
      const res = await fetch(`${apiURL}/api/customers/${cId}`, {
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
  }, [cId, token, apiURL]);

  const submit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      return alert("Please enter name and email.");
    }

    try {
      const res = await fetch(`${apiURL}/api/customers/${cId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify({ userId: uId, name, email })
      });

      const data = await res.json();

      if (res.status === 200) {
        navigate(-1);
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
      initial={{ opacity: 0, x: +200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeOut", duration: 1.5 }}
    >
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

export default RouteCustomerUpdate;