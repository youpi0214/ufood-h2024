<template>
  <div class="container-xl main-content">
    <div class="col-md-auto">
      <div class="profile-info">
        <div class="avatar-name-container">
          <div class="gravatar-container">
            <img :src="gravatarUrl" :alt="userName" class="gravatar" />
          </div>
          <UserHeader
            v-if="dataRecieved"
            :userName="userName"
            :rating="rating"
            :id="id"
          />
        </div>
        <div class="follow-info">
          <FollowModal :following="this.followers" modalId="followers" v-if="dataRecieved" />
          <FollowModal :following="this.following" modalId="following" v-if="dataRecieved" />
        </div>
      </div>
    </div>
    <div class="accordion" id="accordionExample">
      <RecentlyVisitedRestaurants v-if="dataRecieved" :id="id" />
      <FavoritesContainer
        v-if="dataRecieved"
        :userEmail="this.email"
        :userId="id"
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
import { getUserById } from "@/api/user";

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
    showFollowersPopup() {
      this.popupTitle = "Followers";
      this.popupList = this.followers;
      this.showPopup = true;
    },
    showFollowingPopup() {
      this.popupTitle = "Following";
      this.popupList = this.following;
      this.showPopup = true;
    },
    hidePopup() {
      this.showPopup = false;
    },
    async getUserInfo(userId) {
      try {
        const userData = await getUserById(userId);
        console.log(userData)
        this.userName = userData.name;
        this.email = userData.email;
        this.id = userData.id;
        this.rating = userData.rating;
        this.followers = userData.followers;
        this.following = userData.following;
        console.log(this.following)
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
    console.log(to.params.userId);
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

.follow-section {
  margin-right: 20px;
  cursor: pointer;
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

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: #fff;
  padding: 80px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.popup-content h2 {
  margin-bottom: 20px;
  color: #ff5555;
}

.popup ul {
  list-style: none;
  padding: 0;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: #888;
  z-index: 100;
}

.close-icon:hover {
  color: #555;
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

  .follow-section {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
  .popup-content {
    background-color: #fff;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: relative;
  }
}
</style>
