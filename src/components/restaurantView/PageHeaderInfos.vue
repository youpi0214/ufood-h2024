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
      let color = "";
      let grade = "";
      if (rating > 4.5) {
        grade = "EXCELLENT";
        color = "forestgreen";
      } else if (rating > 4.0) {
        grade = "VERY GOOD";
        color = "yellowgreen";
      } else if (rating > 3.0) {
        grade = "GOOD";
        color = "orange";
      } else if (rating > 2.0) {
        grade = "OK";
        color = "orangered";
      } else {
        grade = "POOR";
        color = "firebrick";
      }
      return { grade, color };
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="left-half">
      <div>
        <span id="title">{{ name }}</span>
        <span id="rating" :style="{ color: ratingColor(this.rating).color }"
          >{{ "★" }} {{ rating }} {{ ratingColor(this.rating).grade }}</span
        >
      </div>
      <div>{{ "⚲" }} {{ address }}</div>
    </div>
    <div class="right-half">
      <div>
        <span
          ><i class="bi bi-telephone-fill" style="margin-right: 5px"></i></span
        >{{ tel }}
      </div>
      <div>
        <span><i class="bi bi-funnel-fill"></i></span>
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
  font-weight: bold;
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
