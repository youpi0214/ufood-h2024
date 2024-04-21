<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <div
        id="favoritesMenu"
        style="
          display: flex;
          justify-content: space-between;
          flex-direction: row;
        "
        class="accordion-button collapsed"
        data-bs-toggle="collapse"
        data-bs-target="#collapseThree"
        aria-expanded="false"
        aria-controls="collapseThree"
      >
        <div type="button" style="background: transparent; border: none">
          Favorites
        </div>
      </div>
    </h2>
    <div
      id="collapseThree"
      class="accordion-collapse collapse"
      data-bs-parent="#accordionExample"
    >
      <div class="accordion-body container">
        <div class="favorite-container">
          <div
            id="box"
            style="
              display: flex;
              flex-direction: column;
              justify-items: center;
              align-items: center;
              width: 100%;
            "
          >
            <div style="width: 50%">
              <input
                v-if="addingNewList"
                ref="searchInput"
                class="form-control me-2"
                type="search"
                placeholder="Ex: My New Favorite List"
                aria-label="Search"
                v-model="newListName"
              />
              <div
                style="
                  flex-direction: row;
                  justify-content: space-around;
                  display: flex;
                "
              >
                <div id="create" style="cursor: pointer">
                  <i
                    v-if="isUserOwner"
                    :class="btnLogo"
                    class="favorite-container-footer"
                    style="color: dodgerblue"
                    @click="addFavouriteList"
                  >
                    {{ btnText }}
                  </i>
                </div>
                <div id="cancel" v-if="addingNewList" style="cursor: pointer">
                  <i
                    class="bi bi-x-lg favorite-container-footer"
                    style="color: red"
                    @click="cancelAddFavouriteList"
                  >
                    Cancel
                  </i>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="userFavoriteLists.length === 0"
            class="d-flex justify-content-center"
          >
            No Favorites
          </div>
          <FavoriteList
            v-for="list in userFavoriteLists"
            :id="list.id"
            :isUserOwner="isUserOwner"
            :update="updateFavoriteList"
            :key="list.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FavoriteList from "@/components/profile/FavoriteList.vue";
import { createFavoriteList } from "@/api/favorites.lists";
import { getAllAvailableDataWithQueryFunction } from "@/components/profile/script/profile.utility";
import { getUserFavoriteLists } from "@/api/user";
import Cookies from "js-cookie";

export default {
  name: "FavoritesContainer",
  components: { FavoriteList },
  props: {
    id: { required: true },
    userEmail: { required: true },
  },
  computed: {
    btnLogo() {
      return !this.addingNewList ? "bi-plus-circle" : "bi-check-circle";
    },
    btnText() {
      return !this.addingNewList ? "Add new list" : " Create";
    },
    validListName() {
      return (
        this.newListName !== null &&
        this.newListName !== undefined &&
        this.newListName !== ""
      );
    },
    isUserOwner() {
      return this.id === this.userId;
    },
  },
  data() {
    return {
      userFavoriteLists: [],
      newListName: null,
      addingNewList: false,
      userId: Cookies.get("userId"),
    };
  },
  methods: {
    cancelAddFavouriteList() {
      this.addingNewList = false;
      this.newListName = null;
    },
    async addFavouriteList() {
      if (
        this.addingNewList &&
        this.validListName &&
        (await createFavoriteList(this.userEmail, this.newListName))
      ) {
        await this.updateFavoriteList().then(() => {
          this.addingNewList = false;
        });
      } else {
        this.addingNewList = true;
      }
    },
    async updateFavoriteList() {
      [this.userFavoriteLists] = await getAllAvailableDataWithQueryFunction(
        getUserFavoriteLists,
        [this.id],
        10,
      );
    },
  },
  mounted() {
    this.updateFavoriteList();
  },
  watch: {
    id() {
      this.updateFavoriteList();
    },
  },
};
</script>
<style>
.accordion-item {
  margin-top: 1rem;
  margin-bottom: 2rem;
}

#favoritesMenu:hover {
  background-color: #e8e8e8;
  cursor: pointer;
}

.favorite-container-footer:hover {
  text-decoration-line: underline;
}
</style>
