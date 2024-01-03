<template>
    <div class="pagination-buttons">
        <button @click="onPageChange(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
        <span class="page-num-details">{{ currentPage }} / {{ totalPages }}</span>
        <button @click="onPageChange(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
    </div>
</template>
  
<script>
export default {
    name: 'PaginationButtons',
    props: {
        currentPage: Number,
        totalPages: Number,
        onPageChange: Function,
    },
};
</script>
  
<style scoped>
.pagination-buttons button {
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}
.pagination-buttons button:hover {
  background-color: #2980b9;
}
.pagination-buttons button:disabled {
  background-color: #ddd;
  color: #888;
  cursor: not-allowed;
}
.page-num-details {
  margin: 0 20px
}  
</style>
  