<template>
  <div class="modal-background">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">×</button>
      <span>Create a new favorite list : </span>
      <span><input placeholder="Ex: Youpi" style="width: 100%" /></span>
      <div style="display: flex; justify-content: center; align-items: center">
        - OR -
      </div>
      <div>Choose an existing list :</div>
      <div class="favorite-list-container">
        <select style="width: 100%" v-model="selectedList">
          <option
            v-for="list in favoriteLists"
            :key="list.id"
            style="padding: 1rem"
          >
            {{ list.name }}
          </option>
        </select>
        <!-- Hiba's Code -->
        <!--        <div-->
        <!--          v-for="list in favoriteLists"-->
        <!--          :key="list.id"-->
        <!--          style="padding: 1rem"-->
        <!--          @click="addRestaurantToList(list.id)"-->
        <!--        >-->
        <!--          {{ list.name }}-->
        <!--        </div>-->
      </div>
      <button
        style="margin-top: 1rem"
        class="btn btn-success"
        @click="closeModal"
      >
        Add
      </button>
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
      selectedList: null,
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

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
