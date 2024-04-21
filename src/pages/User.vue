<template>
  <div class="container-xl main-content">
    <div class="col-md-auto">
      <div class="profile-info">
        <div class="avatar-name-container" style="flex: 3">
          <div class="gravatar-container">
            <img
              :src="gravatarUrl"
              :alt="userName"
              style="width: 7rem; height: 100%"
              class="gravatar"
            />
          </div>
          <UserHeader
            v-if="dataReceived"
            :userName="userName"
            :rating="rating"
            :id="id"
            :followers="followers"
            @update="getUserInfo(id)"
          />
        </div>
        <div id="follow" style="width: 100%; flex: 1">
          <div class="follow-info">
            <FollowModal
              :following="this.followers"
              modalId="followers"
              v-if="dataReceived"
              @click="getUserInfo(id)"
            />
            <FollowModal
              :following="this.following"
              modalId="following"
              v-if="dataReceived"
              @click="getUserInfo(id)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="accordion" id="accordionExample">
      <RecentlyVisitedRestaurants
        v-if="dataReceived"
        :id="id"
        @click="getUserInfo(id)"
      />
      <FavoritesContainer
        v-if="dataReceived"
        :userEmail="this.email"
        :id="id"
        @click="getUserInfo(id)"
      />
    </div>
  </div>
</template>

<script>
import md5 from "md5";
import UserHeader from "@/components/profile/UserHeader.vue";
import RecentlyVisitedRestaurants from "@/components/profile/RecentlyVisitedRestaurant.vue";
import FavoritesContainer from "@/components/profile/FavoritesContainer.vue";
import Cookies from "js-cookie";
import { getUserById } from "@/api/user";

import FollowModal from "@/components/profile/FollowModal.vue";

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
      dataReceived: false,
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
        this.dataReceived = true;
      } catch (error) {
        console.error("Error getting user...");
      }
    },
  },
  created() {
    this.getUserInfo(this.$route.params.userId);
  },
  async beforeRouteUpdate(to, from) {
    this.dataReceived = false;
    this.id = to.params.userId;
    await this.getUserInfo(to.params.userId);
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
}

.avatar-name-container {
  display: flex;
  align-items: center;
}

#follow {
  display: flex;
  justify-content: flex-end;
}

@media screen and (max-width: 768px) {
  #follow {
    justify-content: center;
  }

  .profile-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .avatar-name-container {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .follow-info {
    margin-top: 1rem;
  }
}
</style>
<script setup></script>
