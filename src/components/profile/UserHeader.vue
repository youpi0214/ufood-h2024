<template>
  <div id="userHeader">
    <div id="userHeaderInfo">
      <div id="userName" style="font-size: 2rem">
        {{ userName }}
      </div>
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 1rem;
        "
      >
        <div id="rating">★ {{ rating }}</div>
      </div>
    </div>
    <div class="followButton" v-show="this.id !== this.userId">
      <button v-show="!isFollowed" class="follow" @click="follow">
        + Follow
      </button>
      <button v-show="isFollowed" class="unfollow" @click="unfollow">
        – Unfollow
      </button>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { followUser, unfollowUser } from "@/api/user";

export default {
  name: "UserHeader",
  props: {
    userName: { type: String, required: true },
    rating: { type: Number, required: true },
    id: { type: String, required: true },
    followers: { type: Array, required: true },
  },
  computed: {
    isFollowed() {
      return this.followers.find((follower) => follower.id === this.userId);
    },
  },
  data() {
    return {
      userId: Cookies.get("userId"),
    };
  },
  methods: {
    async follow() {
      await followUser(this.id);
      this.$emit("update");
    },
    async unfollow() {
      await unfollowUser(this.id);
      this.$emit("update");
    },
  },
};
</script>

<style scoped>
#userName {
  font-weight: bold;
  font-size: large;
}

#rating {
  width: max-content;
  background-color: #f1f1f1;
  border-radius: 5rem;
  height: max-content;
  padding: 0.25rem 0.5rem;
}

.follow {
  padding: 0.25rem 0.5rem;
  background-color: dodgerblue;
  border: none;
  color: white;
  border-radius: 5rem;
  transition: ease-in-out 0.25s;
}

.follow:hover {
  background-color: #1a79d7;
  transition: ease-in-out 0.25s;
}

.unfollow {
  padding: 0.25rem 0.5rem;
  background-color: #ea1111;
  border: none;
  color: white;
  border-radius: 5rem;
  transition: ease-in-out 0.25s;
}

.unfollow:hover {
  background-color: #ab0404;
  transition: ease-in-out 0.25s;
}
#userHeaderInfo {
  display: flex; flex-direction: row
}

@media screen and (max-width: 768px) {
  .followButton {
    display: flex;
    justify-content: center;
  }
  #userHeaderInfo {
    flex-direction: column;
  }
}

@media screen and (min-width: 769px) {
  #userHeader {
    margin-left: 1rem;
  }
}
</style>
