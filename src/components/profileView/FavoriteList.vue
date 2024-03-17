<template>
  <div class="favorite-list">
    <div class="favorite-list-header">
      <input
        v-if="editMode"
        class="form-control me-2 w-50 p-3"
        aria-label="edit name"
        v-model="newName"
      />
      <h3 v-else>{{ name }}</h3>
      <i
        style="color: dodgerblue; cursor: pointer; font-size: 1.3rem"
        :class="editBtnText"
        @click="editName"
      ></i>
      <i
        style="color: red; cursor: pointer; font-size: 1.3rem"
        class="bi bi-trash3-fill"
        @click="deleteList"
      ></i>
    </div>
    <SearchBar
      :isFavoriteSearchBar="true"
      :favouriteListID="id"
      :update="updateFavoriteList"
      :restaurantsInFavouriteList="restaurantIds"
    ></SearchBar>
    <div class="favorite-list-body">
      <FavoriteCard
        v-for="restaurantId in restaurantIds"
        :restaurantId="restaurantId.id"
        :key="restaurantId.id"
        :update="updateFavoriteList"
        :removeFromList="removeFromList"
      />
    </div>
  </div>
</template>

<script>
import {
  deleteFavoriteList,
  getaSpecificFavoriteList,
  removeRestaurantFromFavoriteList,
  renameFavoriteList,
} from "@/api/favorites.lists";
import FavoriteCard from "@/components/profileView/FavoriteCard.vue";
import SearchBar from "@/components/homeView/SearchBar.vue";
import { Owner } from "@/components/profileView/script/profile.utility";

export default {
  name: "FavoriteList",
  components: { SearchBar, FavoriteCard },
  props: {
    id: { type: String, required: true },
    update: { type: Function, required: true },
  },
  computed: {
    editBtnText() {
      return this.editMode ? "bi bi-floppy-fill" : "bi bi-pencil-fill";
    },
  },
  data() {
    return {
      name: "",
      newName: "",
      restaurantIds: [],
      owner: Owner,
      editMode: false,
    };
  },
  methods: {
    async removeFromList(restaurant_id) {
      await removeRestaurantFromFavoriteList(this.id, restaurant_id).then(
        () => {
          this.updateFavoriteList();
        },
      );
    },
    async updateFavoriteList() {
      [, this.name, this.restaurantIds, this.owner] =
        await getaSpecificFavoriteList(this.id);
      this.newName = this.name;
    },
    async editName() {
      if (
        this.newName !== null &&
        this.newName !== "" &&
        this.newName !== this.name &&
        this.editMode
      ) {
        await renameFavoriteList(this.id, this.newName, this.owner.email).then(
          async () => {
            await this.updateFavoriteList().then(() => {
              this.editMode = false;
            });
          },
        );
      } else if (this.editMode) {
        this.editMode = false;
      } else {
        this.editMode = true;
      }
    },
    async deleteList() {
      if (confirm("Are you sure you want to delete this list?")) {
        await deleteFavoriteList(this.id);
        this.update();
      }
    },
  },
  async created() {
    await this.updateFavoriteList();
  },
};
</script>

<style scoped>
.favorite-list {
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #f8f9fa;
}

.favorite-list-header {
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.favorite-list-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}
</style>
