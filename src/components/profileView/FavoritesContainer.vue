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

          <div class="favorite-container-footer">
            <button class="btn btn-primary" @click="addFavouriteList">
              add new list
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FavoriteList from "@/components/profileView/FavoriteList.vue";
import { createFavoriteList, getAllFavoriteLists } from "@/api/favorites.lists";
import { Owner } from "@/components/profileView/Owner";
import { RestaurantQueryOptions } from "@/api/api.utility";

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
    async getTotal() {
      const [_, total] = await getAllFavoriteLists();
      return total;
    },
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
      this.userFavoriteLists = [];

      let queryQuantity = 1000;
      let totalQueries = (await this.getTotal()) / queryQuantity;

      for (let i = 0; i < totalQueries; i++) {
        const options = [
          [RestaurantQueryOptions.LIMIT, queryQuantity],
          [RestaurantQueryOptions.PAGE, i],
        ];
        const [favoriteLists, _] = await getAllFavoriteLists(options);
        for (let j = 0; j < favoriteLists.length; j++) {
          if (favoriteLists[j].owner.id === this.owner.id) {
            this.userFavoriteLists.push(favoriteLists[j]);
          }
        }
      }
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
</style>
