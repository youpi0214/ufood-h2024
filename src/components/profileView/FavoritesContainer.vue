<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseThree"
        aria-expanded="false"
        aria-controls="collapseThree"
      >
        Favorites
      </button>
    </h2>
    <div
      id="collapseThree"
      class="accordion-collapse collapse"
      data-bs-parent="#accordionExample"
    >
      <div class="accordion-body">
        <div class="favorite-container">
          <FavoriteList
            v-for="list in userFavoriteLists"
            :id="list.id"
            :update="updateFavoriteList"
            :key="list.id"
          />

          <div class="favorite-container-footer" style="color: dodgerblue; cursor: pointer">
            <i class="bi bi-plus-circle" @click="addFavouriteList">
              Add new list
            </i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FavoriteList from "@/components/profileView/FavoriteList.vue";
import { createFavoriteList } from "@/api/favorites.lists";
import {getAllAvailableDataWithQueryFunction, Owner} from "@/components/profileView/script/profile.utility";
import {getUserFavoriteLists} from "@/api/user";


export default {
  name: "FavoritesContainer",
  components: { FavoriteList },
  props: {
    owner: { type: Owner, required: true },
  },
  data() {
    return {
      userFavoriteLists: [],
    };
  },
  methods: {
    async addFavouriteList() {
      const listName = prompt(
        "Please enter the name of the list",
        `Favorite List ${this.userFavoriteLists.length + 1}`,
      );
      if (await createFavoriteList(this.owner.email, listName)) {
        await this.updateFavoriteList();
      }
    },
    async updateFavoriteList() {
      [this.userFavoriteLists,] = await getAllAvailableDataWithQueryFunction(getUserFavoriteLists,[this.owner.id],10)
    },
  },
  async created() {
    await this.updateFavoriteList();
  },
};
</script>
<style scoped>
.accordion-item {
  margin-top: 1rem;
}
.favorite-container-footer:hover {
  text-decoration-line: underline;
}
</style>
