import { AppContext } from "../App";
import { useState, useContext } from "react";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "./Notification";

const CreateHistory = ({ cId, createHistory }) => {
  const apiURL = useContext(AppContext);

  const [notification, setNotification] = useState({
    message: "",
    display: false,
    bgColor: ""
  });
  const [date, setDate] = useState("2022-05-05");
  const [info, setInfo] = useState("");

  const token = localStorage.getItem("token");

  const submit = async (e) => {
    e.preventDefault();

    if (!date || !info) {
      return alert("Please enter date and info.");
    }

    try {
      const res = await fetch(`${apiURL}/api/histories/${cId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify({ customerId: cId, date, info })
      });

      const data = await res.json();

      if (res.status === 200) {
        createHistory(data.history);
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
      <form className="form-create-history" onSubmit={submit}>
        <div>
          <label>
            Date
            <br />
            <input id="date" type="date" value={date} onChange={(e) => { setDate(moment(e.target.value).format('YYYY-MM-DD')); }} required />
          </label>
        </div>
        <div>
          <label>
            Info
            <br />
            <textarea id="info" cols="30" rows="10" value={info} onChange={(e) => { setInfo(e.target.value); }} required></textarea>
          </label>
        </div>
        <div>
          <button className="btn btn-add" id="btn-add" type="submit" style={{ marginTop: "0px" }}>Add</button>
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

export default CreateHistory;