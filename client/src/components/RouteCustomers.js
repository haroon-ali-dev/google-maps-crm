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
        apiKey: process.env.REACT_APP_GM_KEY,
        version: "weekly"
      });

      await loader.importLibrary('core');

      window.geocoder = new window.google.maps.Geocoder();
      window.infowindow = new window.google.maps.InfoWindow();

      window.myMap = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 53.4733352, lng: -2.2600077 },
        zoom: 10
      });

      for (let customer of customers) {
        window.geocoder.geocode({ 'address': customer.postCode }, function (results, status) {
          if (status === 'OK') {
            window.myMap.setCenter(results[0].geometry.location);

            const marker = new window.google.maps.Marker({
              map: window.myMap,
              position: results[0].geometry.location
            });

            window.google.maps.event.addListener(marker, 'click', function () {
              window.infowindow.setContent(`
                <div style='color:black;'>
                  <strong>${customer.name}</strong>
                  <br/>
                  ${customer.email}
                  <br/>
                  ${customer.postCode}
                </div>
              `);
              window.infowindow.open(window.myMap, this);
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

        const marker = new window.google.maps.Marker({
          map: window.myMap,
          position: results[0].geometry.location
        });

        window.google.maps.event.addListener(marker, 'click', function () {
          window.infowindow.setContent(`
            <div style='color:black;'>
              <strong>${customer.name}</strong>
              <br/>
              ${customer.email}
              <br/>
              ${customer.postCode}
            </div>
          `);
          window.infowindow.open(window.myMap, this);
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