<script>
export default {
  name: "ImageSlider",
  props: {
    pictures: {
      type: Array,
      default: () => [
        "https://wallpapercave.com/wp/wp11260432.jpg",
        "https://wallpapers.com/images/hd/green-mcdonald-s-logo-ydibzt83bgsa17la.jpg",
        "https://images4.alphacoders.com/109/thumb-1920-1093163.jpg",
      ],
    },
    currentIndex: {
      type: Number,
      default: 0,
    }
  },
  methods: {
    prevImage() {
      this.$emit('update:currentIndex', (this.currentIndex + 1) % this.pictures.length);
    },
    nextImage() {
      this.$emit('update:currentIndex', (this.currentIndex - 1 + this.pictures.length) % this.pictures.length);
    }
  }
};
</script>

<template>
  <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div
        v-for="(picture, index) in pictures"
        :key="index"
        :class="['carousel-item', { active: index === this.currentIndex}]"
      >
        <img :src="picture" class="d-block w-100" alt="..." />
      </div>
    </div>
    <button
      id="buttonSlide"
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleControls"
      data-bs-slide="prev"
      @click="prevImage"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    </button>
    <button
      id="buttonSlide"
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleControls"
      data-bs-slide="next"
      @click="nextImage"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
    </button>
  </div>
</template>

<style scoped>
#buttonSlide {
  background: transparent;
  border: none;
}
</style>

