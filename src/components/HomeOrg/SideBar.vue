<template>
  <aside class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
    <ul>
      <!-- Add filter items as needed -->
    </ul>
  </aside>
</template>

<script>
export default {
  props: {
    isSidebarOpen: Boolean
  }
};
</script>

<style scoped>

.sidebar {
  position: fixed;
  top: 80px;
  left: -250px; /* Initially hidden */
  width: 220px;
  height: 100%;
  background-color: yellow;
  color: black;
  transition: left 0.5s ease;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  padding: 10px;
}

.sidebar-open {
  left: 0;
}

</style>
