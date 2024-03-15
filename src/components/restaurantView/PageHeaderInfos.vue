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
  data() {
    return {
      isMobile: false,
    };
  },
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
      switch (rating != null) {
        case rating >= 4.5:
          grade = "Excellent";
          color = "forestgreen";
          break;
        case rating >= 4.0:
          grade = "Very Good";
          color = "yellowgreen";
          break;
        case rating >= 3.0:
          grade = "Good";
          color = "orange";
          break;
        case rating >= 2.0:
          grade = "Ok";
          color = "orangered";
          break;
        default:
          grade = "Poor";
          color = "firebrick";
      }
      return { grade, color };
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 1000;
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<template>
  <div class="container" style="margin-top: 6rem">
    <div
      class="content"
      :style="{ flexDirection: isMobile ? 'column' : 'row' }"
    >
      <div class="info" :style="{ flex: isMobile ? 'auto' : 2 }">
        <div>
          <span id="title">{{ name }}</span>
          <span id="rating" :style="{ color: ratingColor(this.rating).color }"
          >{{ "★" }} {{ rating }} {{ ratingColor(this.rating).grade }}</span
          >
        </div>
        <div>{{ "⚲" }} {{ address }}</div>
      </div>
      <div
        class="info"
        :style="{
          flex: isMobile ? 'auto' : 1,
          textAlign: isMobile ? 'center' : 'right',
        }"
      >
        <div style="justify-content: flex-end">
          <span
          ><i
            class="bi bi-telephone-fill"
            style="margin-right: 5px"
          ></i></span
          >{{ tel }}
        </div>
        <div>
          <span><i class="bi bi-funnel-fill"></i></span>
          {{ formatGenres(genres) }} {{ "•" }}
          {{ "$".repeat(this.price_range) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 5rem;
}

.content {
  display: flex;
  width: 100%;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.info:last-child {
  align-items: flex-end;
}

#title {
  font-size: 1.5rem;
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

@media (max-width: 1000px) {
  /* Media query for mobile screens */
  .content {
    flex-direction: column;
    align-items: center;
  }

  .info {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}
</style>
