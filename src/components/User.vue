<template>
  <div class="container-xl main-content">
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
import { Owner } from "@/components/profileView/script/profile.utility";
import Cookies from "js-cookie";
import { getUserById } from "@/api/user";

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
      userName: Cookies.get("userName"),
      email: Cookies.get("userEmail"),
      id: Cookies.get("userId"),
      rating: 0,
      isSwitched: false,
    };
  },
  async created() {
    const userData = await getUserById(Cookies.get("userId"));
    this.userName = userData.name;
    this.email = userData.email;
    this.id = userData.id;
    this.rating = userData.rating;
  },
};
</script>

<style scoped>
.main-content {
  margin-top: 6rem;
  position: relative;
}

.accordion {
  margin-top: 1rem;
}
</style>
