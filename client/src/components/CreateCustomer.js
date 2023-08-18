import { AppContext } from "../App";
import { useState, useContext } from "react";
import jwt from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Notification from "./Notification";

const schema = yup.object({
  name: yup.string().min(3).max(300).required().label("Name"),
  email: yup.string().max(256).email().required().label("Email"),
  postCode: yup.string().min(3).max(10).required().label("Post Code"),
}).required();

const CreateCustomer = ({ createCustomer }) => {
  const apiURL = useContext(AppContext);

  const [notification, setNotification] = useState({
    message: "",
    display: false,
    bgColor: ""
  });

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

  const onSubmit = async (formData) => {
    try {
      const res = await fetch(`${apiURL}/api/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify({ userId: uId, ...formData })
      });

      const data = await res.json();

      if (res.status === 200) {
        createCustomer(data.customer);
        setValue("name", "");
        setValue("email", "");
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
        <div className="form-input-container">
          <label>
            Post Code
            <br />
            <input
              id="postCode"
              type="text"
              {...register("postCode")}
            />
          </label>
          {errors.postCode?.message && (
            <div className='cont-invalid'>
              <span className='invalid-text'>{errors.postCode?.message}</span>
            </div>
          )}
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