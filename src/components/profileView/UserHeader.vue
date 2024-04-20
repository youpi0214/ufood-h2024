<template>
  <div>
    <div style="display: flex; flex-direction: row">
      <div id="userName" style="font-size: 2rem">
        {{ userName }}
      </div>
      <div v-show="this.id !== this.userId" style="display: flex; justify-content: center; align-items: center; margin-left: 1rem">
        <button v-show="!isFollowed" class="follow" @click="follow">
          + Follow
        </button>
        <button v-show="isFollowed" class="unfollow" @click="unfollow">
          – Unfollow
        </button>
      </div>
    </div>
    <div id="rating">★ {{ rating }}</div>
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
  padding: 0.25rem 0.5rem;
  border-radius: 5rem;
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
</style>
