<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" @click="toggleOffCanvas">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
    <div :class="{ offcanvas: isOffCanvasOpen }">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">Offcanvas Menu</h5>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="toggleOffCanvas"
        ></button>
      </div>
      <div class="offcanvas-body">
        <ul class="list-group">
          <li class="list-group-item">Item 1</li>
          <li class="list-group-item">Item 2</li>
          <li class="list-group-item">Item 3</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOffCanvasOpen: false,
    };
  },
  methods: {
    toggleOffCanvas() {
      this.isOffCanvasOpen = !this.isOffCanvasOpen;
    },
  },
};
</script>

<style>
.offcanvas {
  position: fixed;
  top: 56px; /* Adjust based on your navbar height */
  bottom: 0;
  left: -250px; /* Adjust based on your off-canvas width */
  width: 250px; /* Adjust based on your off-canvas width */
  background-color: #fff;
  transition: left 0.3s ease;
  z-index: 1050;
}

.offcanvas.show {
  left: 0;
}

.offcanvas-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.offcanvas-title {
  margin-bottom: 0;
}

.offcanvas-body {
  padding: 0.5rem 1rem;
}

.navbar-toggler {
  border-color: transparent;
}

.navbar-toggler:focus {
  outline: none;
}
</style>
