<template>
  <div class="container-xl main-content">
    <div class="col-md-auto">
      <UserHeader :userName="userName" :rating="rating" :id="id" />
    </div>
    <div class="accordion" id="accordionExample">
      <RecentlyVisitedRestaurants :id="id" />
      <FavoritesContainer :owner="Owner" />
      <div class="section" @click="showFollowersPopup">
        <h2>Followers</h2>
      </div>
      <div class="section" @click="showFollowingPopup">
        <h2>Following</h2>
      </div>
    </div>
    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <h2>{{ popupTitle }}</h2>
        <ul v-if="popupList.length > 0">
          <li v-for="item in popupList" :key="item.id">{{ item.name }}</li>
        </ul>
        <p v-else>No {{ popupTitle.toLowerCase() }}</p>
        <span class="close-icon" @click="hidePopup">&#10006;</span>
      </div>
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
      followers: [],
      following: [],
      showPopup: false,
      popupTitle: "",
      popupList: [],
    };
  },
  async created() {
    try {
      const userData = await getUserById(Cookies.get("userId"));
      this.followers = userData.followers;
      this.following = userData.following;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
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
  },
};
</script>

<style scoped>
.main-content {
  margin-top: 6rem;
  position: relative;
  font-family: Arial, sans-serif;
}

.accordion {
  margin-top: 1rem;
}

.section {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.section:hover {
  background-color: #f5f5f5;
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
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.popup-content h2 {
  margin-bottom: 10px;
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
  z-index: 100; /* Ensure the close icon appears on top */
}

.close-icon:hover {
  color: #555;
}
</style>
