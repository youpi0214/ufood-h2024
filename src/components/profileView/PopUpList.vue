<template>
  <div class="popup-container" v-if="visible">
    <div class="popup" @mouseleave="resetHover">
      <div class="popup-header">
        <h2>{{ title }}</h2>
        <span class="close-button" @click="closePopup">×</span>
      </div>
      <!-- Render the list here -->
      <ul>
        <li
          v-for="item in items"
          :key="item.id"
          @mouseenter="setHover(item.id)"
          @mouseleave="resetHover"
          class="follower-item"
        >
          <img
            :src="item.avatarUrl"
            :alt="item.username"
            class="avatar"
            :class="{ 'hover-shadow': hoveredItem === item.id }"
          />
          <span :class="{ 'hover-shadow': hoveredItem === item.id }">{{
            item.username
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    title: String,
    items: Array,
  },
  data() {
    return {
      hoveredItem: null,
    };
  },
  methods: {
    closePopup() {
      this.$emit("close");
    },
    setHover(itemId) {
      this.hoveredItem = itemId;
    },
    resetHover() {
      this.hoveredItem = null;
    },
  },
};
</script>

<style scoped>
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: white;
  padding: 60px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  max-width: 100%;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px; /* Increased margin */
}

.close-button {
  cursor: pointer;
  font-size: 1.5rem;
}

ul {
  list-style: none;
  padding: 0;
}

.follower-item {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 2rem;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.hover-shadow {
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.hover-shadow:hover {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  transform: scale(1.05);
}

.hover-shadow:hover + .hover-shadow {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
