import { AppContext } from "../App";
import { useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import { motion } from "framer-motion";
import { Loader } from '@googlemaps/js-api-loader';

import CreateCustomer from "./CreateCustomer";

const RouteCustomers = () => {
  const navigate = useNavigate();
  const apiURL = useContext(AppContext);

  const token = localStorage.getItem("token");
  const { uId } = jwt(token);

  const mapRef = useRef({});
  const mapElementRef = useRef(null);

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

      mapRef.current.map = new window.google.maps.Map(mapElementRef.current, {
        center: { lat: 53.4733352, lng: -2.2600077 },
        zoom: 10
      });

      customers.forEach((customer, index) => {
        window.geocoder.geocode({ 'address': customer.postcode }, function (results, status) {
          if (status === 'OK') {
            mapRef.current.map.setCenter(results[0].geometry.location);

            const marker = new window.google.maps.Marker({
              map: mapRef.current.map,
              position: results[0].geometry.location
            });

            window.google.maps.event.addListener(marker, 'click', function () {
              window.infowindow.setContent(`
                <div style='color:black;'>
                  <h3>${customer.name}</h3>
                  <p style='margin-top:4px;'>${customer.email}</p>
                  <p style='margin-top:4px;'>${customer.postcode}</p>
                  <button class='btn btn-map' id='btn-map'>View Details</button>
                </div>
              `);

              window.infowindow.open(mapRef.current.map, this);

              window.infowindow.addListener('domready', () => {
                const btnMap = document.getElementById('btn-map');

                btnMap.addEventListener('click', () => {
                  navigate(`/customer/${customer._id}`);
                });
              });
            });
          }
        });
      });
    }

    getCustomers();
  }, [apiURL, token, uId, navigate]);

  const createCustomer = (customer) => {
    window.geocoder.geocode({ 'address': customer.postcode }, function (results, status) {
      if (status === 'OK') {
        mapRef.current.map.setCenter(results[0].geometry.location);

        const marker = new window.google.maps.Marker({
          map: mapRef.current.map,
          position: results[0].geometry.location
        });

        window.google.maps.event.addListener(marker, 'click', function () {
          window.infowindow.setContent(`
            <div style='color:black;'>
              <h3>${customer.name}</h3>
              <p style='margin-top:4px;'>${customer.email}</p>
              <p style='margin-top:4px;'>${customer.postcode}</p>
              <button class='btn btn-map' id='btn-map'>View Details</button>
            </div>
          `);

          window.infowindow.open(mapRef.current.map, this);

          window.infowindow.addListener('domready', () => {
            const btnMap = document.getElementById('btn-map');

            btnMap.addEventListener('click', () => {
              navigate(`/customer/${customer._id}`);
            });
          });
        });
      }
    });
  }

  return (
    <div className='containerFormMap'>
      <motion.div
        className='containerForm'
        initial={{ opacity: 0, x: +200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeOut", duration: 1.5 }}
      >
        <div className="cont panel">
          <CreateCustomer createCustomer={createCustomer} />
        </div>
      </motion.div>

      <motion.div
        className='containerMap'
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeOut", duration: 1.5 }}
      >
        <div id='map' ref={mapElementRef}></div>
      </motion.div>
      
    </div>
  );
}

export default RouteCustomers;