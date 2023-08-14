import { AppContext } from "../App";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { parse, isDate } from "date-fns";

import Notification from "./Notification";

const today = new Date();

function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}

const schema = yup.object({
  date: yup.date().transform(parseDateString).max(today).label("Date"),
  info: yup.string().max(1000).label("Info")
}).required();

const RouteHistoryUpdate = () => {
  const apiURL = useContext(AppContext);
  const navigate = useNavigate();

  const [notification, setNotification] = useState({
    message: "",
    display: false,
    bgColor: ""
  });
  const { hId } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getHistory = async () => {
      const res = await fetch(`${apiURL}/api/histories/${hId}`, {
        headers: { "x-auth-token": token }
      });

      const data = await res.json();

      if (data.message === "success") {
        setValue("date", moment(data.history.date).format('YYYY-MM-DD'));
        setValue("info", data.history.info);
      } else {
        alert(data.message);
      }
    }

    getHistory();
  }, [hId, token, apiURL]);

  const onSubmit = async (formData) => {
    formData.date = moment(formData.date).utcOffset("+0100").format("YYYY-MM-DD");

    try {
      const res = await fetch(`${apiURL}/api/histories/${hId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify(formData)
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>
              Date
              <br />
              <input
                id="date"
                type="date"
                {...register("date")}
              />
            </label>
            {errors.date?.message && (
              <div className='cont-invalid'>
                <span className='invalid-text'>{errors.date?.message}</span>
              </div>
            )}
          </div>
          <div>
            <label>
              Info
              <br />
              <textarea
                id="info"
                cols="30"
                rows="10"
                {...register("info")}
              >
              </textarea>
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