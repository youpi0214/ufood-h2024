<template>
  <div>
    <ul>
      <li v-for="followingItem in following" :key="followingItem.id">
        <img :src="followingItem.avatarUrl" alt="Following Avatar">
        <span class="username">{{ followingItem.username }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    following: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
}

.username {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
