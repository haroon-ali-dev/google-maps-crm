import { AppContext } from "../App";
import { useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import jwt from "jwt-decode";
import { motion } from "framer-motion";

import { getCustomers } from "../functions/customers";
import { loadMap, showCustomers } from "../functions/map";

import CreateCustomer from "./CreateCustomer";

const RouteCustomers = () => {
  const navigate = useNavigate();
  const apiURL = useContext(AppContext);
  const token = localStorage.getItem("token");
  const { uId } = jwt(token);

  const mapRef = useRef({});
  const mapElementRef = useRef(null);

  useEffect(() => {
    async function init() {
      const customers = await getCustomers(apiURL, uId, token);
      await loadMap(mapRef, mapElementRef);
      showCustomers(mapRef, customers, navigate);
    }

    init();
  }, [apiURL, token, uId, navigate]);

  return (
    <div className='containerFormMap'>
      <motion.div
        className='containerForm'
        initial={{ opacity: 0, x: +200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeOut", duration: 1.5 }}
      >
        <div className="cont panel">
          <CreateCustomer mapRef={mapRef} />
        </div>
      </motion.div>

      <motion.div
        className='containerMap'
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeOut", duration: 1.5 }}
      >
        <div className='map' ref={mapElementRef}></div>
      </motion.div>
    </div>
  );
}

export default RouteCustomers;