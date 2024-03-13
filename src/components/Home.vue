<template>
  <div class="container-lg">
    <div class="row">
      <div class="main-content col-auto">
        <div class="d-flex justify-content-center">
          <div class="col">
            <div class="row d-flex justify-content-center">
              <button
                class="btn btn-success"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
                @click="toggleSidebar"
              >
                <i class="bi bi-filter-square-fill"></i>
                Filters
              </button>
            </div>
            <div class="row d-flex justify-content-center">
              <form class="d-flex w-50 p-3" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                />
                <button class="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
        <RestaurantCards :filteredRestaurants="filteredRestaurants" />
      </div>
      <div
        class="sidebar"
        :class="{ 'sidebar-open': isSidebarOpen }"
        @click="closeSidebar"
      >
        <SideBar
          :isSidebarOpen="isSidebarOpen"
          @apply-filters="applyFilters"
          @reset-filters="resetFilters"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RestaurantCards from "@/components/homeView/RestaurantCards.vue";
import SideBar from "@/components/homeView/SideBar.vue";
import { mapState, mapGetters, mapActions, useStore } from "vuex";
import { ref, watch } from "vue";

export default {
  components: {
    RestaurantCards,
    SideBar,
  },
  setup() {
    const store = useStore();
    const isSidebarOpen = ref(store.state.isSidebarOpen);

    watch(
      () => store.state.isSidebarOpen,
      (newValue) => {
        isSidebarOpen.value = newValue;
        if (newValue) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
      },
    );
    const toggleSidebar = () => {
      store.dispatch("changeSideBarState");
    };

    const closeSidebar = () => {
      store.dispatch("closeSidebar");
    };

    return {
      isSidebarOpen,
      toggleSidebar,
      closeSidebar,
    };
  },
  computed: {
    ...mapState(["selectedPrice", "selectedCategory"]),
    ...mapGetters(["filteredRestaurants"]),
  },
  methods: {
    ...mapActions(["setSelectedFilters"]),
    applyFilters(price, category) {
      this.setSelectedFilters({ price, category });
    },
    resetFilters() {
      this.setSelectedFilters({ price: "All", category: "All" });
    },
  },
};
</script>

<style scoped>
.main-content {
  margin-top: 20px;
  position: relative;
}
.row {
  display: flow;
}

@media (max-width: 600px) {
  .btn {
    display: none;
  }
}
</style>
