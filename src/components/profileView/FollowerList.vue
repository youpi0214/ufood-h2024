<template>
  <div>
    <ul>
      <li v-for="followerItem in followers" :key="followerItem.id">
        <img :src="followerItem.avatarUrl" alt="Follower Avatar">
        <span class="username">{{ followerItem.username }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    followers: {
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
