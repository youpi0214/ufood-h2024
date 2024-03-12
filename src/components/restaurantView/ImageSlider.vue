<template>
  <div>
    <div
      id="carouselExampleControls"
      class="carousel slide"
      data-bs-ride="carousel"
      style="max-width: 100%; max-height: 400px; overflow: hidden"
    >
      <div class="carousel-inner" style="background-color: #000000">
        <!-- Added inline styles -->
        <div
          v-for="(picture, index) in pictures"
          :key="index"
          :class="['carousel-item', { active: index === this.currentIndex }]"
        >
          <img
            :src="picture"
            class="d-block w-100"
            alt="..."
            style="object-fit: contain; width: 100%; height: 400px"
          />
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
    <div style="display: flex; width: 100%">
      <button
        style="flex: 1; border-radius: 0px"
        class="btn btn-primary btn-lg"
      >
        Register a visit
      </button>
      <button
        style="flex: 1; border-radius: 0px"
        id="loveButton"
        class="btn btn-primary btn-lg"
      >
        ♥ Add to favourites
      </button>
    </div>
  </div>
</template>

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
    },
  },
  methods: {
    prevImage() {
      this.$emit(
        "update:currentIndex",
        (this.currentIndex + 1) % this.pictures.length,
      );
    },
    nextImage() {
      this.$emit(
        "update:currentIndex",
        (this.currentIndex - 1 + this.pictures.length) % this.pictures.length,
      );
    },
  },
};
</script>

<style scoped>
#buttonSlide {
  background: transparent;
  border: none;
}
#loveButton {
  background-color: crimson;
  color: white;
  border: none;
  border-radius: 7px;
}
#loveButton:hover {
  background-color: #ac0a29;
}
</style>
