<template>
  <div class="container">
    <nav class="navigation">
      <router-link to="/" class="nav-link">Home</router-link>
      <div class="search-bar">
        <input type="text" placeholder="Search..." v-model="searchQuery" class="search-input">
        <button @click="search" class="search-button">Search</button>
      </div>
      <div @click="toggleDropdown" class="dropdown" v-if="userLoggedIn">
        {{ userName }}
        <span class="dropbtn">▼</span>
        <div v-if="showDropdown" class="dropdown-content">
          <router-link to="/user" class="dropdown-item">Profile</router-link>
          <a @click="logout" class="dropdown-item">Logout</a>
        </div>
      </div>
      <div v-if="!userLoggedIn" class="login-form">
        <input type="text" placeholder="Username or Email" v-model="userEmail" class="login-input">
        <input type="password" placeholder="Password" v-model="userPassword" class="login-input">
        <button @click="login" class="login-button">Login</button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userLoggedIn = ref(localStorage.getItem('userLoggedIn') === 'true');
const showDropdown = ref(false);
const userName = ref(localStorage.getItem('userName') || '');
const userEmail = ref('');
const userPassword = ref('');
const searchQuery = ref('');

const router = useRouter();

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function login() {
  if (userEmail.value && userPassword.value) {
    userLoggedIn.value = true;
    userName.value = userEmail.value;
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("userName", userEmail.value);
    userEmail.value = '';
    userPassword.value = '';
    showDropdown.value = false;
  } else {
    alert("Please enter both email and password.");
  }
}

function logout() {
  userLoggedIn.value = false;
  localStorage.removeItem("userLoggedIn");
  localStorage.removeItem("userName");
  showDropdown.value = false;

  router.push({ path: '/' });
}

function search() {
  alert(`Performing search for: ${searchQuery.value}`);
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 1rem;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #004d40;
  padding: 1rem;
  border-radius: 0.5rem;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-input {
  flex-grow: 1;
  border: 2px solid #ddd;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  margin-right: 0.5rem;
}

.search-button {
  background-color: #00897b;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #00695c;
}

.login-form {
  display: flex;
  align-items: center;
}

.login-form input[type="text"],
.login-form input[type="password"] {
  border: 2px solid #ddd;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  margin-right: 0.5rem;
  font-size: 1rem;
}

.login-button {
  background-color: #00897b;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #00695c;
}

.dropdown {
  position: relative;
  color: #ffffff; /* Set username color to white */
  font-size: 1.2rem; /* Increase font size */
  display: flex;
  align-items: center;
}

.dropbtn {
  margin-left: 0.5rem; /* Add space between username and dropdown button */
  font-size: 1rem; /* Set dropdown button font size */
  border: none;
  cursor: pointer;
  background: none; /* Ensures that the button has no background */
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #ffffff;
  min-width: 160px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  top: 100%;
  right: 0;
}

.dropdown-content .dropdown-item {
  color: #333333;
  padding: 0.75rem 1rem;
  text-decoration: none;
  display: block;
  transition: background-color 0.3s;
}

.dropdown-content .dropdown-item:hover {
  background-color: #f5f5f5;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropbtn {
  color: #ffffff;
  font-size: 1rem;
  border: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .navigation {
    flex-direction: column;
    align-items: stretch;
  }

  .search-bar,
  .login-form {
    width: 100%;
    margin-top: 1rem;
  }

  .search-input,
  .login-form input[type="text"],
  .login-form input[type="password"] {
    width: 100%;
  }

  .search-button,
  .login-button {
    width: 100%;
  }
}
</style>

