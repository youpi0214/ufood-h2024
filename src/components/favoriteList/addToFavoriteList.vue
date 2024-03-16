<template>
  <div v-if="showModal" class="modal-background">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">×</button>
      <h2>Select a Favorite List</h2>
      <div class="favorite-list-container">
        <button
          v-for="list in favoriteLists"
          :key="list.id"
          class="favorite-list-btn"
          @click="addRestaurantToList(list.id)"
        >
          {{ list.name }}
        </button>
      </div>
      <button class="cancel-btn" @click="closeModal">Cancel</button>
    </div>
  </div>
</template>

<script>
import {
  getAllFavoriteLists,
  addRestaurantToFavoriteList,
} from "@/api/favorites.lists";

export default {
  name: "AddToFavoritesModal",
  props: {
    showModal: Boolean,
    restaurantId: String,
  },
  data() {
    return {
      favoriteLists: [],
    };
  },
  async created() {
    const [items] = await getAllFavoriteLists();
    this.favoriteLists = items;
  },
  methods: {
    async addRestaurantToList(listId) {
      await addRestaurantToFavoriteList(listId, this.restaurantId);
      this.closeModal();
      this.$emit("update-list");
    },
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.close-btn, .cancel-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.favorite-list-btn {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  background-color: #4CAF50;
  color: white;
  border: none;
  text-align: left;
  cursor: pointer;
}

.favorite-list-btn:hover {
  background-color: #45a049;
}
</style>

