<template>
  <div class="map-view w-100">
    <link
      href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
      rel="stylesheet"
    />
    <div
      ref="mapElement"
      :style="{ height: homePage ? '600px' : '400px' }"
    ></div>
    <div v-if="!homePage">
      <button
        class="btn btn-danger btn-lg btn-block"
        v-if="!getDirectionsIsClicked"
        @click="showRoute"
      >
        Get Directions
      </button>
      <button
        id="hideButton"
        class="btn btn-primary btn-lg btn-block"
        v-if="getDirectionsIsClicked"
        @click="hideRoute"
      >
        Hide Directions
      </button>
    </div>
  </div>
</template>

<script>
import mapboxgl from "!mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  getRoute,
  removeRoute,
  MAPBOX_API_KEY,
} from "./map.utility.js";
import { getAllRestaurantsByUserLocation } from "./map.utility.js";

export default {
  props: {
    centeredPosition: {
      type: Array
    },
    homePage: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      map: null,
      currentPosition: null,
      getDirectionsIsClicked: false,
      restaurantMarkers: []
    };
  },
  methods: {
    async initMap() {
      await this.getCurrentPositionInHomePage();
      mapboxgl.accessToken = MAPBOX_API_KEY;
      this.map = new mapboxgl.Map({
        attributionControl: false,
        container: this.$refs.mapElement,
        center: this.homePage ? this.currentPosition : this.centeredPosition,
        style: "mapbox://styles/mapbox/outdoors-v11?optimize=true",
        zoom: this.homePage ? 8 : 15
      });
      if (this.homePage) {
        // var [restaurants, __] = await getAllRestaurantsByUserLocation(
        //   this.map.getCenter().toArray(),
        // );
        // this.showRestaurants(restaurants);
        this.map.addControl(new mapboxgl.NavigationControl());
        this.map.on("moveend", async () => {
          var [restaurants, __] = await getAllRestaurantsByUserLocation(
            this.map.getCenter().toArray()
          );
          await this.showRestaurants(restaurants);
        });
      } else {
        new mapboxgl.Marker({ color: "red" })
          .setLngLat(this.centeredPosition)
          .addTo(this.map);
      }
    },
    async getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.currentPosition = [
              position.coords.longitude,
              position.coords.latitude
            ];
          },
          (error) => {
            console.error("Error getting current location:", error);
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
      return this.currentPosition;
    },
    async showRoute() {
      if (this.currentPosition) {
        this.getDirectionsIsClicked = true;
        await getRoute(this.currentPosition, this.centeredPosition, this.map);
        const bounds = new mapboxgl.LngLatBounds(
          this.currentPosition,
          this.centeredPosition
        );
        const markers = [this.centeredPosition, this.currentPosition];
        markers.forEach((marker) => bounds.extend(marker.coordinates));
        this.map.fitBounds(bounds, { padding: 40, duration: 2000 });
      } else {
        alert("You must allow browser to use location");
      }
    },
    async hideRoute() {
      this.getDirectionsIsClicked = false;
      await removeRoute(this.centeredPosition, this.map);
    },
    async getCurrentPositionInHomePage() {
      while (!this.currentPosition) {
        this.currentPosition = await this.getLocation();
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      if (this.currentPosition) {
        console.log(this.currentPosition);
        return this.currentPosition;
      }
    },
    async showRestaurants(restaurants) {
      console.log(this.restaurantMarkers.length, this.restaurantMarkers);
      if (this.restaurantMarkers.length > 0) {
        this.restaurantMarkers.forEach(marker => marker.remove());
        this.restaurantMarkers = [];
      }
      // console.log(this.restaurantMarkers.length, this.restaurantMarkers);
      // let features = [];
      for (const restaurant of restaurants) {
        const marker = new mapboxgl.Marker({color: 'red'})
          .setLngLat(restaurant.location.coordinates)
          .addTo(this.map);
        this.restaurantMarkers.push(marker);
        // features.push({
        //   type: 'Feature',
        //   geometry: {
        //     type: 'Point',
        //     coordinates: [
        //       restaurants[i].location.coordinates[0], restaurants[i].location.coordinates[1]
        //     ]
        //   },
        // })
      }
      // if (this.map.getLayer('points')) {
      //   this.map.removeLayer('points')
      // }
      // if (this.map.getSource('points')) {
      //   this.map.removeSource('points');
      // }
      // this.map.loadImage(
      //   'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
      //   (error, image) => {
      //     if (error) throw error;
      //
      //     if (!this.map.hasImage('ufood')) {
      //       this.map.addImage('ufood', image);
      //     }
      //     this.map.addSource(`points`, {
      //       type: 'geojson',
      //       data: {
      //         type: 'FeatureCollection',
      //         features: features
      //       }
      //     });
      //     this.map.addLayer({
      //       id: `points`,
      //       type: 'symbol',
      //       source: 'points',
      //       layout: {
      //         'icon-image': 'ufood',
      //         'text-field': ['get', 'title'],
      //         'text-font': [
      //           'Open Sans Semibold',
      //           'Arial Unicode MS Bold'
      //         ],
      //         'text-offset': [0, 1.25],
      //         'text-anchor': 'top'
      //       }
      //     });
      //   });
      console.log(this.restaurantMarkers.length, this.restaurantMarkers);
    }
  },

  created() {
    this.getLocation();
    if (this.homePage && this.map) {

      this.showRestaurants()
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>

<style scoped>
.btn {
  background-color: #ff3434;
}

#hideButton {
  background-color: white;
  color: #ff3434;
  border-color: #ff3434;
}
</style>
