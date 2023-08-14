import { AppContext } from "../App";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwt from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Notification from "./Notification";

const schema = yup.object({
  name: yup.string().min(3).max(300).required().label("Name"),
  email: yup.string().max(256).email().required().label("Email"),
}).required();

const RouteCustomerUpdate = () => {
  const apiURL = useContext(AppContext);
  const navigate = useNavigate();

  const [notification, setNotification] = useState({
    message: "",
    display: false,
    bgColor: ""
  });
  const { cId } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });

  const token = localStorage.getItem("token");
  const { uId } = jwt(token);

  useEffect(() => {
    const getCustomerInfo = async () => {
      const res = await fetch(`${apiURL}/api/customers/${cId}`, {
        headers: { "x-auth-token": token }
      });

      const data = await res.json();
      if (data.message === "success") {
        setValue("name", data.customer.name);
        setValue("email", data.customer.email);
      } else {
        alert(data.message);
      }
    }

    getCustomerInfo();
  }, [cId, token, apiURL]);

  const onSubmit = async (formData) => {
    try {
      const res = await fetch(`${apiURL}/api/customers/${cId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify({ userId: uId, ...formData })
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-input-container">
            <label>
              Name
              <br />
              <input
                id="name"
                type="text"
                {...register("name")}
              />
            </label>
            {errors.name?.message && (
              <div className='cont-invalid'>
                <span className='invalid-text'>{errors.name?.message}</span>
              </div>
            )}
          </div>
          <div className="form-input-container">
            <label>
              Email
              <br />
              <input
                id="email"
                type="text"
                {...register("email")}
              />
            </label>
            {errors.email?.message && (
              <div className='cont-invalid'>
                <span className='invalid-text'>{errors.email?.message}</span>
              </div>
            )}
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