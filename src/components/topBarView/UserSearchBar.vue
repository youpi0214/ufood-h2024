<template>
  <div
    class="col d-flex justify-content-center position-relative"
    @click="handleClickOutside"
  >
    <div class="col d-flex justify-content-center position-relative">
      <form class="d-flex w-75 p-3" role="search">
        <input
          ref="userSearchInput"
          class="form-control me-2"
          type="search"
          placeholder="Search Users..."
          aria-label="Search"
          v-model="search"
        />
      </form>
      <!-- Search results dropdown -->
      <ul
        v-if="users.length > 0"
        class="search-result list-group mt-3 dropdown-menu position-absolute"
        :style="{
          width: $refs.userSearchInput.offsetWidth + 'px',
          left: $refs.userSearchInput.offsetLeft + 'px',
          top: $refs.userSearchInput.offsetHeight + 'px',
        }"
        @click="handleClickInside"
      >
        <li
          v-for="user in users"
          :key="user.id"
          style="display: flex; justify-content: space-between"
          class="list-group-item"
        >
          <div>
            <router-link :to="`/user/${user.id}`">
              {{ user.name }}
            </router-link>
          </div>
          <div style="cursor: pointer">
            <i
              class="bi bi-plus-circle-fill"
              style="color: dodgerblue"
              :hidden="isPresentInFollowingList(user.id)"
              @click="follow(user.id)"
            >
            </i>
            <i
              class="bi bi-trash3-fill"
              style="color: red"
              :hidden="!isPresentInFollowingList(user.id)"
              @click="unflollow(user.id)"
            >
            </i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { RestaurantQueryOptions } from "@/api/api.utility";
import { followUser, getUserById, getUsers, unfollowUser } from "@/api/user";
import Cookies from "js-cookie";
import { displayPopup } from "@/components/topBarView/script/user_search";

export default {
  name: "UserSearchBar",
  data() {
    return {
      search: undefined,
      users: [],
      followingList: []
    };
  },
  methods: {
    async follow(id) {
      await followUser(id)
        .then(() => {
          this.clearSearch();
        })
        .then(() => {
          this.updateFollowingList();
        }).catch((error) => {
          displayPopup("Get some friends", error);
        });
    },
    async unflollow(id) {
      await unfollowUser(id)
        .then(() => {
          this.clearSearch();
        })
        .then(() => {
          this.updateFollowingList();
        });
    },
    clearSearch() {
      this.search = "";
      this.users = [];
    },
    async updateFollowingList() {
      this.followingList = await getUserById(Cookies.get("userId")).then(
        (user) => user.following
      );
    },
    async searchUsers() {
      const queryOption = [
        [RestaurantQueryOptions.Q, this.search],
        [RestaurantQueryOptions.LIMIT, 12]
      ];
      let total = 0;
      [this.users, total] = await getUsers(queryOption);
    },
    handleClickOutside(event) {
      if (!this.$refs.userSearchInput.contains(event.target)) {
        this.clearSearch();
      }
    },
    handleClickInside(event) {
      event.stopPropagation();
    },
    isPresentInFollowingList(idToCheck) {
      return this.followingList.some((user) => user.id === idToCheck);
    }
  },
  async created() {
    await this.updateFollowingList();
  },
  watch: {
    search() {
      const searchFormatted = this.search.trim().toLowerCase();
      if (searchFormatted !== undefined && searchFormatted !== "") {
        this.searchUsers();
      } else {
        this.users = [];
      }
    }
  }
};
</script>

<style scoped>
.search-result {
  max-height: 30rem;
  overflow-y: auto;
}

</style>
