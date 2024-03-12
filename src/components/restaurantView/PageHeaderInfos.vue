<script>
export const formatString = function (day) {
  return day.charAt(0).toUpperCase() + day.slice(1);
};
export function formatGenres(genres) {
  let formattedGenres = genres.map((genre) => formatString(genre));
  return formattedGenres.join(", ");
}
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
    formatGenres,
    ratingColor(rating) {
      if (rating > 4) return "forestgreen";
      if (rating > 3) return "orange";
      if (rating > 2) return "orangered";
      else return "firebrick";
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="left-half">
      <div>
        <span id="title">{{ name }}</span>
        <span id="rating" :style="{ backgroundColor: ratingColor(this.rating) }"
          >{{ "★" }} {{ rating }}</span
        >
      </div>
      <div>{{ "⚲" }} {{ address }}</div>
    </div>
    <div class="right-half">
      <div>{{ tel }}</div>
      <div>
        {{ formatGenres(genres) }} {{ "•" }} {{ "$".repeat(this.price_range) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 200px;
}

.left-half,
.right-half {
  width: calc(50% - 5px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
}

.right-half {
  align-items: flex-end;
}

#title {
  font-size: 2rem;
  margin-top: 15px;
  font-weight: bold;
}

#rating {
  font-size: 1rem;
  padding: 3px;
  border-radius: 20px;
  margin-left: 10px;
  color: #ffffff;
}

@media (max-width: 600px) {
  /* Media query for mobile screens */
  .container {
    flex-direction: column;
    align-items: center;
  }

  .left-half,
  .right-half {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}
</style>
