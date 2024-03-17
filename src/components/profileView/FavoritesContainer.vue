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
      <div class="accordion-body container">
        <div class="favorite-container">
          <div id="box" style="display: flex; flex-direction: column; justify-items: center; align-items: center">
            <input
              v-if="addingNewList"
              ref="searchInput"
              class="form-control me-2"
              style="width: 60%"
              type="search"
              placeholder="Ex: My New Favorite List"
              aria-label="Search"
              v-model="newListName"
            />
            <div style="width:60%; flex-direction: row; justify-content: space-around; display: flex">
              <div id="create">
                <i
                  :class="btnLogo"
                  class="favorite-container-footer"
                  style="color: dodgerblue"
                  @click="addFavouriteList"
                >
                  {{ btnText }}
                </i>
              </div>
              <div id="cancel" v-if="addingNewList">
                <i
                  class="bi bi-x-lg favorite-container-footer"
                  style="color: red"
                  @click="cancelAddFavouriteList"
                >
                  Cancel
                </i>
              </div>
            </div>
            <!--            <div-->
            <!--              class="d-flex justify-content-center"-->
            <!--              style="color: dodgerblue; cursor: pointer"-->
            <!--            >-->
            <!--              <form-->
            <!--                v-if="addingNewList"-->
            <!--                class="w-75 p-3 create-fav-input"-->
            <!--                role="search"-->
            <!--              >-->
            <!--                <input-->
            <!--                  ref="searchInput"-->
            <!--                  class="form-control me-2 favorite-container-footer"-->
            <!--                  type="search"-->
            <!--                  placeholder="Search Restaurants..."-->
            <!--                  aria-label="Search"-->
            <!--                  v-model="newListName"-->
            <!--                />-->
            <!--              </form>-->
            <!--              <div class="row favorite-handle-buttons">-->
            <!--                <div class="col-md">-->
            <!--                  <i-->
            <!--                    :class="btnLogo"-->
            <!--                    class="favorite-container-footer"-->
            <!--                    @click="addFavouriteList"-->
            <!--                  >-->
            <!--                    {{ btnText }}-->
            <!--                  </i>-->
            <!--                </div>-->
            <!--                <div v-if="addingNewList" class="col-md">-->
            <!--                  <i-->
            <!--                    class="bi bi-x-lg favorite-container-footer"-->
            <!--                    style="color: red"-->
            <!--                    @click="cancelAddFavouriteList"-->
            <!--                  >-->
            <!--                    Cancel-->
            <!--                  </i>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
          </div>

          <FavoriteList
            v-for="list in userFavoriteLists"
            :id="list.id"
            :update="updateFavoriteList"
            :key="list.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FavoriteList from "@/components/profileView/FavoriteList.vue";
import { createFavoriteList } from "@/api/favorites.lists";
import {
  getAllAvailableDataWithQueryFunction,
  Owner
} from "@/components/profileView/script/profile.utility";
import { getUserFavoriteLists } from "@/api/user";

export default {
  name: "FavoritesContainer",
  components: { FavoriteList },
  props: {
    owner: { type: Owner, required: true }
  },
  computed: {
    btnLogo() {
      return !this.addingNewList ? "bi-plus-circle" : "bi-check-circle";
    },
    btnText() {
      return !this.addingNewList ? "Add new list" : " Create";
    },
    validListName() {
      return this.newListName !== null && this.newListName !== undefined && this.newListName !== "";
    }
  },
  data() {
    return {
      userFavoriteLists: [],
      newListName: null,
      addingNewList: false
    };
  },
  methods: {
    cancelAddFavouriteList() {
      this.addingNewList = false;
      this.newListName = null;
    },
    async addFavouriteList() {
      if (
        this.addingNewList && this.validListName &&
        (await createFavoriteList(this.owner.email, this.newListName))
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
        [this.owner.id],
        10
      );
    }
  },
  async created() {
    await this.updateFavoriteList();
  }
};
</script>
<style scoped>
.accordion-item {
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.favorite-container-footer:hover {
  text-decoration-line: underline;
}

.create-fav-input {
  width: 50rem;
  border-radius: 0.25rem;
}

.favorite-handle-buttons {
  width: 10rem;
}
</style>
