<template>
  <div class="container-xl main-content">
    <div class="col-md-auto">
      <div class="profile-info">
        <div class="avatar-name-container">
          <div class="gravatar-container">
            <img
              :src="gravatarUrl"
              :alt="userName"
              style="width: 7rem; height: 100%"
              class="gravatar"
            />
          </div>
          <UserHeader
            v-if="dataRecieved"
            :userName="userName"
            :rating="rating"
            :id="id"
            :followers="followers"
            @update="getUserInfo(id)"
          />
        </div>
        <div class="follow-info">
          <FollowModal
            :following="this.followers"
            modalId="followers"
            v-if="dataRecieved"
            @update="getUserInfo(id)"
          />
          <FollowModal
            :following="this.following"
            modalId="following"
            v-if="dataRecieved"
            @update="getUserInfo(id)"
          />
        </div>
      </div>
    </div>
    <div class="accordion" id="accordionExample">
      <RecentlyVisitedRestaurants v-if="dataRecieved" :id="id"  @click="getUserInfo(id)" />
      <FavoritesContainer
        v-if="dataRecieved"
        :userEmail="this.email"
        :id="id"
        @click="getUserInfo(id)"
      />
    </div>
  </div>
</template>

<script>
import md5 from "md5";
import UserHeader from "@/components/profileView/UserHeader.vue";
import RecentlyVisitedRestaurants from "@/components/profileView/RecentlyVisitedRestaurant.vue";
import FavoritesContainer from "@/components/profileView/FavoritesContainer.vue";
import Cookies from "js-cookie";
import {getUserById} from "@/api/user";

import FollowModal from "@/components/profileView/FollowModal.vue";

export default {
  computed: {
    gravatarUrl() {
      return `https://www.gravatar.com/avatar/${this.md5Email}?s=80&d=identicon`;
    },
    md5Email() {
      return this.email ? md5(this.email.trim().toLowerCase()) : "";
    },
  },
  components: {
    FollowModal,
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
      followers: [],
      following: [],
      showPopup: false,
      popupTitle: "",
      popupList: [],
      dataRecieved: false,
    };
  },
  methods: {
    async getUserInfo(userId) {
      try {
        const userData = await getUserById(userId);
        this.userName = userData.name;
        this.email = userData.email;
        this.id = userData.id;
        this.rating = userData.rating;
        this.followers = userData.followers;
        this.following = userData.following;
        this.dataRecieved = true;
      } catch (error) {
        console.error("Error getting user...");
      }
    },
  },
  created() {
    this.getUserInfo(this.$route.params.userId);
  },
  beforeRouteUpdate(to, from) {
    this.dataRecieved = false;
    this.getUserInfo(to.params.userId);
  },
};
</script>

<style scoped>
.main-content {
  margin-top: 6rem;
  position: relative;
  font-family: Arial, sans-serif;
}

.profile-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.follow-info {
  display: flex;
}

.follow-section h2 {
  margin: 0;
  font-size: 20px;
}

.follow-section:hover h2 {
  color: #ff5555;
}

.accordion {
  margin-top: 1rem;
}

.popup-content h2 {
  margin-bottom: 20px;
  color: #ff5555;
}

.popup ul {
  list-style: none;
  padding: 0;
}

.gravatar-container {
  text-align: center;
}

.gravatar {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 40px;
}

.avatar-name-container {
  display: flex;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .profile-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .follow-info {
    margin-top: 1rem;
  }
}
</style>
<script setup>
</script>
