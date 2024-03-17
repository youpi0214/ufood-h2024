<template>
  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <div v-if="restaurant" class="container">
      <div class="center-header">
        <PageHeaderInfos
          :name="restaurant.name"
          :address="restaurant.address"
          :rating="restaurantRating"
          :tel="restaurant.tel"
          :price_range="restaurant.price_range"
          :genres="restaurant.genres"
        ></PageHeaderInfos>
      </div>
      <div id="sliderMapContainer" style="display: flex; flex-wrap: wrap">
        <div style="flex: 2; margin-top: 1rem">
          <ImageSlider :pictures="restaurant.pictures"></ImageSlider>
          <div style="display: flex">
            <button
              style="flex: 1; border-radius: 0px"
              class="btn btn-primary btn-lg"
              @click="showFeedbackForm"
            >
              Register Visit
            </button>
            <button
              style="flex: 1; border-radius: 0px"
              id="loveButton"
              class="btn btn-danger btn-lg"
              @click="showAddToFavoriteList"
            >
              ♥ Add to favourites
            </button>
          </div>
        </div>
        <div style="flex: 1; margin: 1rem">
          <MapView
            :restaurant-location="restaurant.location.coordinates"
          ></MapView>
        </div>
      </div>
      <div v-if="showForm">
        <RegisterVisitForm
          @close="hideFeedbackForm"
          :restaurant="restaurant"
        ></RegisterVisitForm>
      </div>
      <div v-if="showAddToFavoritesModal">
        <AddToFavoritesModal
          :owner="this.User"
          @close-modal="handleCloseAddToFavoriteList"
          :restaurant-id="restaurant.id"
        ></AddToFavoritesModal>
      </div>
      <OpenHours :opening-hours="restaurant.opening_hours"></OpenHours>
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
import PageHeaderInfos from "@/components/restaurantView/PageHeaderInfos.vue";
import ImageSlider from "@/components/restaurantView/ImageSlider.vue";
import OpenHours from "@/components/restaurantView/OpenHours.vue";
import MapView from "@/components/restaurantView/MapView.vue";
import { getRestaurantById } from "@/api/restaurant";
import RegisterVisitForm from "@/components/form/RegisterVisitForm.vue";
import AddToFavoritesModal from "@/components/form/AddFavoritesForm.vue";
import { Owner } from "@/components/profileView/script/profile.utility";

export default {
  name: "Restaurant",
  components: {
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
    };
  },
  computed: {
    User() {
      return new Owner({
        email: '"villiam1@gmail.com"',
        id: "619a82f824b6ec0004c9f035",
        name: "William",
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
};
</script>

<style scoped>
@media only screen and (max-width: 1500px) {
  .container {
    flex-direction: column;
    align-items: center;
  }
  .center-header {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  div[style="display: flex; width: 100%"] {
    flex-direction: column;
  }
  #sliderMapContainer {
    margin-top: 5rem;
  }
}
#loveButton {
  background-color: crimson;
  color: white;
  border: none;
  border-radius: 7px;
}
#loveButton:hover {
  background-color: #ac0a29;
}
</style>
