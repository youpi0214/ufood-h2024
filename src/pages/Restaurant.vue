<template>
  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <div v-if="restaurant" class="container">
      <div class="center-header">
        <PageHeaderInfos
          v-if="isDataRecieved"
          :name="restaurant.name"
          :address="restaurant.address"
          :rating="restaurantRating"
          :tel="restaurant.tel"
          :price_range="restaurant.price_range"
          :genres="restaurant.genres"
          style="margin-top: 7rem"
        ></PageHeaderInfos>
      </div>
      <div id="sliderMapContainer">
        <div class="imagesWithButtons">
          <ImageSlider  v-if="isDataRecieved" :pictures="restaurant.pictures"></ImageSlider>
          <div style="display: flex">
            <button
              style="flex: 1; border-radius: 0"
              class="btn btn-danger btn-lg"
              @click="showFeedbackForm"
            >
              <i class="fa-regular fa-pen-to-square"></i> Register Visit
            </button>
            <button
              style="flex: 1; border-radius: 0"
              class="btn btn-danger btn-lg"
              @click="showAddToFavoriteList"
            >
              <i class="fa-solid fa-heart"></i> Add to favourites
            </button>
          </div>
        </div>
        <div class="map">
          <MapView
            v-if="isDataRecieved"
            :home-page="false"
            :centered-position="restaurant.location.coordinates"
          ></MapView>
        </div>
      </div>
      <div v-if="showForm">
        <RegisterVisitForm
          v-if="isDataRecieved"
          @close="hideFeedbackForm"
          :restaurant="restaurant"
        ></RegisterVisitForm>
      </div>
      <div v-if="showAddToFavoritesModal">
        <AddToFavoritesModal
          v-if="isDataRecieved"
          :owner="this.User"
          @close-modal="handleCloseAddToFavoriteList"
          :restaurant-id="restaurant.id"
        ></AddToFavoritesModal>
      </div>
      <OpenHours  v-if="isDataRecieved" :opening-hours="restaurant.opening_hours"></OpenHours>
      <RecommendedRestaurants
        v-if="isDataRecieved"
        :current-restaurant="this.restaurant"
        :genres="this.restaurant.genres"
      />
    </div>
    <div v-else>
      <div
        class="center-header"
        style="display: flex; justify-content: center; align-items: center"
      >
        <div class="spinner-border" role="status"></div>
        <div>Loading...</div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeaderInfos from "@/components/restaurant/PageHeaderInfos.vue";
import ImageSlider from "@/components/restaurant/ImageSlider.vue";
import OpenHours from "@/components/restaurant/OpenHours.vue";
import MapView from "@/components/restaurant/map/MapView.vue";
import { getRestaurantById } from "@/api/restaurant";
import RegisterVisitForm from "@/components/form/RegisterVisitForm.vue";
import AddToFavoritesModal from "@/components/form/AddFavoritesForm.vue";
import { Owner } from "@/components/profile/script/profile.utility";
import RecommendedRestaurants from "@/components/restaurant/RecommendedRestaurants.vue";
import { Restaurant } from "@/components/home/script/card.utility";
import Cookies from "js-cookie";

export default {
  name: "Restaurant",
  components: {
    RecommendedRestaurants,
    AddToFavoritesModal,
    RegisterVisitForm,
    PageHeaderInfos,
    ImageSlider,
    OpenHours,
    MapView,
  },
  data() {
    return {
      isVisible: false,
      restaurant: null,
      showPopup: false,
      showForm: false,
      showAddToFavoritesModal: false,
      isDataRecieved : false,
    };
  },
  computed: {
    Restaurant() {
      return Restaurant;
    },
    User() {
      return new Owner({
        email: Cookies.get("userEmail"),
        id: Cookies.get("userId"),
        name: Cookies.get("userName"),
      });
    },
    restaurantRating() {
      return Math.round(this.restaurant.rating * 100) / 100;
    },
  },
  async created() {
    try {
      this.restaurant = await getRestaurantById(
        this.$route.params.restaurantId,
      );
      this.isDataRecieved = true
    } catch (error) {
      console.error("Error getting restaurant...");
    }
  },
  methods: {
    showFeedbackForm() {
      this.showForm = true;
    },
    hideFeedbackForm() {
      this.showForm = false;
    },
    showAddToFavoriteList() {
      this.showAddToFavoritesModal = true;
    },
    handleCloseAddToFavoriteList() {
      this.showAddToFavoritesModal = false;
    },
  },
  async beforeRouteUpdate(to, from) {
    try {
      this.isDataRecieved = false
      this.restaurant = await getRestaurantById(
        to.params.restaurantId,
      );
      this.isDataRecieved = true
    } catch (error) {
      console.error("Error getting restaurant...");
    }
  }
};
</script>

<style scoped>
#sliderMapContainer {
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
}
.imagesWithButtons {
  flex: 2;
}

.btn {
  background-color: white;
  color: #ff3434;
  border-color: #ff3434;
}

.btn:active {
  background-color: #ff3434;
}

.map {
  flex: 1;
  margin-left: 1rem;
}

.btn:hover {
  background-color: #ff3434;
  text-decoration-line: underline;
  border-color: transparent;
}

@media only screen and (max-width: 1000px) {
  #sliderMapContainer {
    display: flex;
    flex-direction: column;
  }
  .map {
    margin-top: 1rem;
    margin-left: 0;
  }
}
</style>
