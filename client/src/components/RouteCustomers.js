import { AppContext } from "../App";
import { useEffect, useContext } from "react";
import jwt from "jwt-decode";
import { motion } from "framer-motion";
import { Loader } from '@googlemaps/js-api-loader';

import CreateCustomer from "./CreateCustomer";

const RouteCustomers = () => {
  const apiURL = useContext(AppContext);

  const token = localStorage.getItem("token");
  const { uId } = jwt(token);

  useEffect(() => {
    const getCustomers = async () => {
      const res = await fetch(`${apiURL}/api/customers/user/${uId}`, {
        headers: { "x-auth-token": token }
      });
      const data = await res.json();

      if (data.message === "success") {
        loadMap(data.customers);
      } else {
        alert(data.message);
      }
    }

    async function loadMap(customers) {
      const loader = new Loader({
        apiKey: 'AIzaSyBeJfZ2ZER7bSNvcak4JXO8jbYaWqbHMQs',
        version: "weekly"
      });

      await loader.importLibrary('core');

      window.myMap = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 53.4786033, lng: -2.2429839 },
        zoom: 13
      });

      window.geocoder = new window.google.maps.Geocoder();

      for (let customer of customers) {
        window.geocoder.geocode({ 'address': customer.postCode }, function (results, status) {
          if (status === 'OK') {
            window.myMap.setCenter(results[0].geometry.location);

            new window.google.maps.Marker({
              map: window.myMap,
              position: results[0].geometry.location
            });
          }
        });
      }
    }

    getCustomers();
  }, [apiURL, token, uId]);

  const createCustomer = (customer) => {
    window.geocoder.geocode({ 'address': customer.postCode }, function (results, status) {
      if (status === 'OK') {
        window.myMap.setCenter(results[0].geometry.location);

        new window.google.maps.Marker({
          map: window.myMap,
          position: results[0].geometry.location
        });
      }
    });
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: +200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeOut", duration: 1.5 }}
      >
        <div className="cont">
          <CreateCustomer createCustomer={createCustomer} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeOut", duration: 1.5 }}
      >
        <div id='map' style={{ height: '400px', width: '1000px', margin: '0 auto', marginBottom: '100px' }}></div>
      </motion.div>
    </>
  );
}

export default RouteCustomers;