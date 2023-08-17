import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from '@googlemaps/js-api-loader';
import { useEffect } from "react";

const Customers = ({ customers }) => {
  async function loadMap() {
    const loader = new Loader({
      apiKey: 'AIzaSyBeJfZ2ZER7bSNvcak4JXO8jbYaWqbHMQs',
      version: "weekly"
    });

    await loader.importLibrary('core');

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 53.4786033, lng: -2.2429839},
      zoom: 13
   });
  }

  useEffect(() => {
    loadMap();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeOut", duration: 1.5 }}
    >
      <div id='map' style={{ height: '400px', width: '1000px', margin: '0 auto', marginBottom: '100px' }}></div>
    </motion.div>
  );
}

export default Customers;