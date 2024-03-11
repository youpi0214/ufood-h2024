<template>
  <div class="row d-flex justify-content-center">
    <form class="d-flex w-50 p-3" role="search">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Search..."
        aria-label="Search"
      />
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
};
</script>

<style scoped></style>
