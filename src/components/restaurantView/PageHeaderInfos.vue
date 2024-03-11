<script>
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
};
</script>

<template>
  <div class="container">
    <div class="left-half">
      <div>
        <span id="title">{{ name }}</span>
        <span id="rating">{{ "★" }} {{ rating }}</span>
      </div>
      <div>{{ "⚲" }} {{ address }}</div>
    </div>
    <div class="right-half">
      <button id="loveButton" class="btn btn-primary btn-sm">
        Add to favourites
      </button>
      <div>{{ tel }}</div>
      <div>
        {{ genres.join(", ") }} {{ "•" }} {{ "$".repeat(this.price_range) }}
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

#loveButton {
  background-color: crimson;
  color: white;
  border: none;
  border-radius: 7px;
}
#loveButton:hover {
  text-decoration-line: underline;
}
#title {
  font-size: 2rem;
  margin-top: 15px;
  font-weight: bold;
}

#rating {
  font-size: 1rem;
  padding: 5px;
  border-radius: 20px;
  margin-left: 10px;
  color: #000000;
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
