<template>
    <div class="search-bar">
        <label for="filter">Filter:</label>
        <input type="text" :value="filter" @input="updateFilter" id="filter" placeholder="Search...">
    </div>
</template>
  
<script>
  export default {
      name: 'SearchBar',
      props: {
          filter: String,
      },
      methods: {
          updateFilter(event) {
              this.$emit('update:filter', event.target.value);
          },
      },
  };
</script>
  
<style scoped>
.search-bar {
  margin-bottom: 20px;
}
#filter {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}  
</style>
  