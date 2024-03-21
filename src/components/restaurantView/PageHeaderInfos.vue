<script>
import {
  formatGenres,
  ratingColor,
} from "@/components/restaurantView/script/restaurant.utility";

export default {
  name: "PageHeaderInfos",
  props: {
    name: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
      default: "",
    },
    tel: {
      type: String,
      default: "",
    },
    genres: {
      type: Array,
      default: () => [],
    },
    price_range: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    ratingColor,
    formatGenres,
  },
};
</script>

<template>
  <div class="content">
    <div class="info1">
      <div id="nameAndRating">
        <div id="title">{{ name }}</div>
        <div id="rating" :style="{ color: ratingColor(this.rating).color }">
          {{ "★" }} {{ rating }} {{ ratingColor(this.rating).grade }}
        </div>
      </div>
      <div>{{ "⚲" }} {{ address }}</div>
    </div>
    <div class="info2">
      <div>
        <span
          ><i
            class="bi bi-telephone-fill"
            style="margin-right: 5px; color: #ff3434"
          ></i></span
        >{{ tel }}
      </div>
      <div>
        <span><i class="fa-solid fa-utensils" style="color: #ff3434"></i></span>
        {{ formatGenres(genres) }} {{ "•" }}
        {{ "$".repeat(this.price_range) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
#nameAndRating {
  display: flex;
  flex-direction: row;
}

.content {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.info1 {
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.info2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
}

#title {
  font-size: 1.5rem;
  font-weight: bold;
}

#rating {
  font-size: 1.1rem;
  display: flex;
  justify-items: center;
  align-items: center;
  font-weight: bold;
  margin-left: 10px;
  color: #ffffff;
}
div {
  font-family: "Calibri", sans-serif;
}

@media (max-width: 800px) {
  /* Media query for mobile screens */
  .content {
    flex-direction: column;
  }
  .info1 {
    height: auto;
    display: flex;
    flex: 2;
    flex-direction: column;
    justify-content: flex-start;
  }
  .info2 {
    text-align: left;
  }
  #nameAndRating {
    flex-direction: column;
  }
  #rating {
    margin-left: 0;
  }
}
</style>
