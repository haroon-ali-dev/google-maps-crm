import { Loader } from '@googlemaps/js-api-loader';

export async function loadMap(mapRef, mapElementRef) {
    const loader = new Loader({
        apiKey: process.env.REACT_APP_GM_KEY,
        version: "weekly"
    });

    await loader.importLibrary('core');

    mapRef.current.geocoder = new window.google.maps.Geocoder();
    mapRef.current.infowindow = new window.google.maps.InfoWindow();

    mapRef.current.map = new window.google.maps.Map(mapElementRef.current, {
        center: { lat: 53.4733352, lng: -2.2600077 },
        zoom: 10
    });
}

export async function showCustomers(mapRef, customers, navigate) {
    for (let customer of customers) {
        displayCustomer(mapRef, customer, navigate);
    }
}

export async function showCustomer(mapRef, customer, navigate) {
    displayCustomer(mapRef, customer, navigate);
}

function displayCustomer(mapRef, customer, navigate) {
    mapRef.current.geocoder.geocode({ 'address': customer.postcode }, function (results, status) {
        if (status === 'OK') {
            const marker = new window.google.maps.Marker({
                map: mapRef.current.map,
                position: results[0].geometry.location
            });

            window.google.maps.event.addListener(marker, 'click', function () {
                mapRef.current.infowindow.setContent(`
                <div style='color:black;'>
                    <h3>${customer.name}</h3>
                    <p style='margin-top:4px;'>${customer.email}</p>
                    <p style='margin-top:4px;'>${customer.postcode}</p>
                    <button class='btn btn-map' id='btn-map'>View Details</button>
                </div>
            `);

                mapRef.current.infowindow.open(mapRef.current.map, this);

                mapRef.current.infowindow.addListener('domready', () => {
                    const btnMap = document.getElementById('btn-map');

                    btnMap.addEventListener('click', () => {
                        navigate(`/customer/${customer._id}`);
                    });
                });
            });
        }
    });
}