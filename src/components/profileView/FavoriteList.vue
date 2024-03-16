<template>
  <div class="favorite-list">
    <div class="favorite-list-header">
      <h3>{{ name }}</h3>
      <button class="btn btn-primary" @click="editName">edit name</button>
      <button class="btn btn-danger" @click="deleteList">delete list</button>
    </div>
    <div class="favorite-list-body">
      <FavoriteCard
        v-for="restaurantId in restaurantIds"
        :restaurantId="restaurantId.id"
        :key="restaurantId.id"
      />
    </div>
  </div>
</template>

<script>
import {
  deleteFavoriteList,
  getaSpecificFavoriteList,
  renameFavoriteList,
} from "@/api/favorites.lists";
import FavoriteCard from "@/components/profileView/FavoriteCard.vue";
import { Owner } from "@/components/profileView/script/profile.utility";

export default {
  name: "FavoriteList",
  components: { FavoriteCard },
  props: {
    id: { type: String, required: true },
    update: { type: Function, required: true },
  },
  data() {
    return {
      name: "",
      restaurantIds: [],
      owner: Owner,
    };
  },
  methods: {
    async updateFavoriteList() {
      [, this.name, this.restaurantIds, this.owner] =
        await getaSpecificFavoriteList(this.id);
    },
    async editName() {
      const newName = prompt("Please enter the new name of the list");
      if (await renameFavoriteList(this.id, newName, this.owner.email)) {
        await this.updateFavoriteList();
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
