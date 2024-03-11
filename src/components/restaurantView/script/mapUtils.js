import mapboxgl from "mapbox-gl";

let markerCurrentPosition;
export const MAPBOX_API_KEY =
  "pk.eyJ1IjoieW91cGkwMjE0IiwiYSI6ImNsc2kxZWkxNjFhdHoydnFwbWtvemFrOHIifQ.Pil0AJAwK_TVItQJAWkb9g";

async function getRoute(currentPosition, restaurantLocation, map) {
  const [originLong, originLat] = currentPosition;
  const [destinationLong, destinationLat] = restaurantLocation;
  console.log(currentPosition);
  markerCurrentPosition = new mapboxgl.Marker()
    .setLngLat(currentPosition)
    .setPopup(new mapboxgl.Popup().setHTML(`<h5>Your Location</h5>`))
    .addTo(map);
  const query = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${originLong},${originLat};
        ${destinationLong},${destinationLat}?steps=true&geometries=geojson&access_token=${MAPBOX_API_KEY}&overview=full`,
    { method: "GET" },
  );
  const json = await query.json();
  const data = json.routes[0];
  const route = data.geometry.coordinates;
  const geojson = {
    type: "Feature",
    properties: {},
    geometry: {
      type: `LineString`,
      coordinates: route,
    },
  };
  if (map.getSource(`route`)) {
    map.getSource(`route`).setData(geojson);
  } else {
    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: geojson,
      },
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#d73636",
        "line-width": 5,
        "line-opacity": 0.75,
      },
    });
  }
}

async function removeRoute(restaurantLocation, map) {
  markerCurrentPosition.remove();
  if (map.getLayer("route")) {
    map.removeLayer("route");
  }
  if (map.getSource("route")) {
    map.removeSource("route");
  }
  map.flyTo({
    center: restaurantLocation,
    zoom: 15,
    essential: true,
    duration: 2000,
  });
}

export { getRoute, removeRoute };
