<template>
  <div class="container">
    <nav class="navigation">
      <router-link to="/" class="nav-link">Home</router-link>
      <div class="search-bar">
        <input type="text" placeholder="Search..." v-model="searchQuery" class="search-input" />
        <button @click="search" class="search-button">Search</button>
      </div>
      <div v-if="userName" @mouseover="showDropdown = true" @mouseleave="showDropdown = false" class="user-info">
        {{ userName }}
        <div v-if="showDropdown" class="dropdown-menu">
          <router-link to="/user" class="dropdown-item">Profile</router-link>
          <a @click="confirmLogout" class="dropdown-item">Log out</a>
        </div>
      </div>
      <button v-else @click="showPopup = true" class="account-button">Login</button>
    </nav>
    <AccountPopUp v-if="showPopup" @update:user="handleUserUpdate" @close="showPopup = false" />
    <div v-if="showLogoutConfirmation" class="logout-confirmation">
      <p>Are you sure you want to log out?</p>
      <button @click="logout">Yes</button>
      <button @click="cancelLogout">No</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AccountPopUp from './AccountPopUp.vue';

const userName = ref(localStorage.getItem('userName') || '');
const showPopup = ref(false);
const showDropdown = ref(false);
const showLogoutConfirmation = ref(false);
const searchQuery = ref('');
const router = useRouter();

function handleUserUpdate(newUserName) {
  userName.value = newUserName;
  localStorage.setItem('userName', newUserName || '');
  showPopup.value = false;
}

function confirmLogout() {
  showLogoutConfirmation.value = true;
}

function logout() {
  userName.value = '';
  localStorage.removeItem('userName');
  showLogoutConfirmation.value = false;
  router.push('/');
}

function cancelLogout() {
  showLogoutConfirmation.value = false;
}

function search() {
  console.log(`Searching for: ${searchQuery.value}`);
}
</script>
<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #005a4c;
  padding: 20px;
  border-radius: 8px;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
}

.nav-link:hover {
  color: #a7ffeb;
}

.search-bar {
  display: flex;
  position: relative;
}

.search-input {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 20px 0 0 20px;
  outline: none;
  width: 250px;
}

.search-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #00897b;
  color: white;
  border: none;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
}

.search-button:hover {
  background-color: #00695c;
}

.user-info {
  color: white;
  position: relative;
}

.dropdown-menu {
  display: none;
  position: absolute;
  background-color: #ffffff;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  padding: 10px;
  border-radius: 5px;
  top: 100%;
  right: 0;
}

.user-info:hover .dropdown-menu {
  display: block;
}

.dropdown-item {
  color: #005a4c;
  padding: 10px 20px;
  text-decoration: none;
  display: block;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.account-button {
  background-color: #00897b;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.account-button:hover {
  background-color: #00695c;
}

.logout-confirmation {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logout-confirmation button {
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.logout-confirmation button:first-child {
  background-color: #00897b;
  color: white;
}

.logout-confirmation button:last-child {
  background-color: #ccc;
  color: #333;
}

@media (max-width: 768px) {
  .navigation {
    flex-direction: column;
  }

  .search-bar {
    margin-top: 10px;
  }
}
</style>
