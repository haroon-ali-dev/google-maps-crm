import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "./Notification";

const RouteHistoryUpdate = () => {
  const navigate = useNavigate();

  const [notification, setNotification] = useState({
    message: "",
    display: false,
    bgColor: ""
  });
  const { hId } = useParams();
  const [date, setDate] = useState("2022-05-05");
  const [info, setInfo] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getHistory = async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/histories/${hId}`, {
        headers: { "x-auth-token": token }
      });

      const data = await res.json();

      if (data.message === "success") {
        setDate(moment(data.history.date).format('YYYY-MM-DD'));
        setInfo(data.history.info);
      } else {
        alert(data.message);
      }
    }

    getHistory();
  }, [hId, token]);

  const submit = async (e) => {
    e.preventDefault();

    if (!date || !info) {
      return alert("Please enter date and info");
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/histories/${hId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify({ date, info })
      });

      const data = await res.json();
      if (data.message === "success") {
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

export default RouteHistoryUpdate;