<template>
  <div class="container-lg main-content">
    <div class="col-md-auto">
      <UserHeader :userName="userName" :rating="rating" :id="id" />
    </div>
    <div class="accordion" id="accordionExample">
      <RecentlyVisitedRestaurants :id="id" />
      <FavoritesContainer :owner="Owner" />
    </div>
  </div>
</template>

<script>
import UserHeader from "@/components/profileView/UserHeader.vue";
import RecentlyVisitedRestaurants from "@/components/profileView/RecentlyVisitedRestaurant.vue";
import FavoritesContainer from "@/components/profileView/FavoritesContainer.vue";
import { Owner } from "@/components/profileView/Owner";

export default {
  computed: {
    Owner() {
      return new Owner({ email: this.email, id: this.id, name: this.userName });
    },
  },
  components: {
    RecentlyVisitedRestaurants,
    UserHeader,
    FavoritesContainer,
  },
  data() {
    return {
      userName: "William",
      email: '"villiam1@gmail.com"',
      id: "619a82f824b6ec0004c9f035",
      rating: 330,
      isSwitched: false,
    };
  },
};
</script>

<style scoped>
.main-content {
  margin-top: 6rem;
  position: relative;
}

.accordion {
  margin-top: 2rem;
}
</style>
