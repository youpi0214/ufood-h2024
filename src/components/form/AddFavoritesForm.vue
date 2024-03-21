<template>
  <div class="modal-background">
    <div class="modal-content">
      <div style="width: 100%; height: 0.5rem">
        <button class="close-btn" @click="closeModal">×</button>
      </div>
      <span>Create a new favorite list : </span>
      <div style="display: flex; flex-direction: row">
        <input
          placeholder="Ex: My Burgers' List"
          v-model="newListName"
          :disabled="selectedList !== null"
          style="width: 100%"
        />
        <div class="resetButton">
          <i class="bi bi-arrow-counterclockwise" @click="resetTextField"></i>
        </div>
      </div>
      <div
        style="
          display: flex;
          color: darkgrey;
          justify-content: center;
          align-items: center;
          margin: 0.5rem;
        "
      >
        ━━━━━ Or ━━━━━
      </div>
      <div>Choose an existing list :</div>
      <div class="favorite-list-container" style="display: flex">
        <select
          style="width: 95%"
          v-model="selectedList"
          :disabled="newListName !== ''"
        >
          <option
            v-for="list in userFavoriteLists"
            :key="list.id"
            :value="list.id"
            style="padding: 1rem"
          >
            {{ list.name }}
          </option>
        </select>
        <div class="resetButton">
          <i class="bi bi-arrow-counterclockwise" @click="resetSelectList"></i>
        </div>
      </div>
      <button
        style="margin-top: 1rem"
        class="btn btn-danger"
        @click="handleFavorite"
        :disabled="
          newListName.toString().trim().length < 1 && selectedList === null
        "
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
  createFavoriteList,
} from "@/api/favorites.lists";
import { RestaurantQueryOptions } from "@/api/api.utility";
import { Owner } from "@/components/profileView/script/profile.utility";
import { triggerConfetti } from "@/components/form/script/form.utility";

export default {
  name: "AddToFavoritesModal",
  props: {
    showModal: Boolean,
    restaurantId: String,
    owner: { type: Owner, required: true },
  },
  data() {
    return {
      userFavoriteLists: [],
      selectedList: null,
      newListName: "",
    };
  },
  methods: {
    async getTotal() {
      const [_, total] = await getAllFavoriteLists();
      return total;
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
    async handleFavorite() {
      if (this.selectedList) {
        await this.addRestaurantToExistingList(this.selectedList);
        triggerConfetti();
        this.closeModal();
      } else if (this.newListName !== "") {
        await this.createFavListAndAddRestaurant(this.newListName);
        triggerConfetti();
        this.closeModal();
      } else {
        alert("Cannot add restaurant to a fav list");
      }
    },
    async createFavListAndAddRestaurant(listName) {
      const [id, _, __] = await createFavoriteList(this.owner.email, listName);
      await this.addRestaurantToExistingList(id);
    },

    async addRestaurantToExistingList(listId) {
      await addRestaurantToFavoriteList(listId, this.restaurantId);
    },
    closeModal() {
      this.$emit("close-modal");
    },
    resetSelectList() {
      this.selectedList = null;
    },
    resetTextField() {
      this.newListName = "";
    },
  },
  async created() {
    await this.updateFavoriteList();
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

div {
  font-weight: bold;
  color: #ff3434;
  font-family: "Calibri Light", sans-serif;
}

input {
  border-width: 1px;
  border-radius: 20px;
  height: 2rem;
  padding-left: 10px;
  outline: none;
  margin-right: 0.5rem;
}

select {
  border-radius: 20px;
  border-style: inset;
  height: 2rem;
  padding-left: 10px;
  outline: none;
  margin-right: 0.5rem;
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.resetButton {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-self: center;
}
</style>
