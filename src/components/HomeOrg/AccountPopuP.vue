<template>
  <div
    class="account-popup"
    v-if="showPopup"
    style="background-color: white; height: 400px"
  >
    <!-- Popup content -->
    <div class="popup-content" style="padding: 40px">
      <h2>Account</h2>
      <div style="margin-bottom: 20px">
        <input
          type="text"
          placeholder="Username"
          style="
            background-color: antiquewhite;
            display: block;
            width: 250px;
            margin-bottom: 10px;
          "
        />
        <input
          type="password"
          placeholder="Password"
          style="
            background-color: antiquewhite;
            display: block;
            width: 250px;
            margin-bottom: 10px;
          "
        />
      </div>
      <button
        style="background-color: white; display: block; width: 250px"
        @click="closePopup"
      >
        Login
      </button>
      <p style="margin-top: 20px">
        Don't have an account? <a href="#">Sign up</a>
      </p>
    </div>
    <!-- Close button -->
    <span class="close-popup" @click="closePopup">&times;</span>
  </div>
</template>

<script>
export default {
  props: {
    showPopup: Boolean,
    closePopup: Function,
  },
};
</script>

<style scoped>
.account-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.popup-content {
  text-align: center;
}

.close-popup {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: black;
}
</style>
