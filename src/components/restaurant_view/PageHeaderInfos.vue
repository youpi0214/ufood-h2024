<script>
export default {
  name: "PageHeaderInfos",
  props: {
    name: {
      type: String,
      default: "McDonald's",
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    address: {
      type: String,
      default: "⚲ 2520 Chem. des Quatre-Bourgeois, QC, G1V 4R2",
    },
    tel: {
      type: String,
      default: "(418) 651-5085",
    },
    genres: {
      type: String,
      default: "Fast-Food",
    },
    price_range: {
      type: String,
      default: "$$",
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
      <div>{{ address }}</div>
    </div>
    <div class="right-half">
      <div>{{ tel }}</div>
      <div>{{ genres }} {{ "•" }} {{ price_range }}</div>
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
  font-size: 3vw;
  margin-top: 15px;
  font-weight: bold;
}

#rating {
  font-size: 1vw;
  padding: 5px;
  border-radius: 20px;
  margin-left: 10px;
  color: whitesmoke;
}
</style>
