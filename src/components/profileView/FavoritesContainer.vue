<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
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
            v-for="list in favoriteListArray"
            :name="list"
            :key="list"
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

export default {
  name: "FavoritesContainer",
  components: { FavoriteList },
  data() {
    return {
      favoriteListArray: [],
    };
  },
  methods: {},
};
</script>

<style scoped></style>
