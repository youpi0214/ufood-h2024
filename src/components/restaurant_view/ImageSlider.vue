<script>
export default {
  name: "ImageSlider",
  props: {
    pictures: {
      type: Array,
      default: () => [
        'https://wallpapercave.com/wp/wp11260432.jpg',
        'https://wallpapers.com/images/hd/green-mcdonald-s-logo-ydibzt83bgsa17la.jpg',
        'https://images4.alphacoders.com/109/thumb-1920-1093163.jpg'
      ],
    },
  },
};
</script>

<template>
  <div id="carouselExample" class="carousel slide">
    <div class="carousel-inner">
      <div
        v-for="(picture, index) in pictures"
        :key="index"
        :class="['carousel-item', { active: index === 0 }]"
      >
        <img :src="picture" class="d-block w-100" alt="..." />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<style scoped></style>
