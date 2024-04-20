<template>
  <div>
    <div id="userName">
      {{ userName }}
      <span v-show="this.id !== this.userId">
        <button v-show="!isFollowed" class="btn btn-primary" @click="follow">
          + Follow
        </button>
        <button v-show="isFollowed" class="btn btn-danger" @click="unfollow">
          – Unfollow
        </button>
      </span>
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
</style>
