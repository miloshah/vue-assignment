<template>
  <div class="page_container">
    <AppLoader v-if="loading" />
    <div v-else>
      <SearchBar @update:filter="onFilterUpdate" />
    </div>
    <transition name="fade" mode="out-in">
      <div class="post_container" :key="currentPage">
        <PostCard v-for="post in paginatedPosts" :key="post.id" :post="post"></PostCard>
      </div>
    </transition>
    <PaginationButtons
      :currentPage="currentPage"
      :totalPages="totalPages"
      :onPageChange="onPageChange"
    />
  </div>
</template>

<script>
import AppLoader from './AppLoader.vue';
import SearchBar from './SearchBar.vue';
import PaginationButtons from './PaginationButtons.vue';
import PostCard from './PostCard.vue';
import { ApiService } from '../services/apiServices';

export default {
  name: 'PageLayout',
  components: {
    AppLoader,
    SearchBar,
    PaginationButtons,
    PostCard,
  },
  data: function () {
    return {
      loading: true,
      posts: [],
      users: [],
      filter: '',
      perPage: 10,
      currentPage: 1,
      totalPages: 0,
      postsToDisplay: [],
    }
  },
  watch: {
    filter() {
      this.updateFilteredPosts();
    },    
  },
  computed: {
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.postsToDisplay.slice(start, end);
    },
    filterLower() {
      return this.filter.toLowerCase();
    },
  },
  methods: {
    processPostsAndUsers : (posts, users) => {
      return posts.map(post => ({
        ...post,
        user: users.find(user => user.id === post.userId),
      }));
    },
    async fetchData() {
      try {
        const [posts, users] = await Promise.all([
          ApiService.getPosts(),
          ApiService.getUsers(),
        ]);

        this.users = users;
        this.posts = this.processPostsAndUsers(posts, users);
        
        this.postsToDisplay = this.posts;
        this.setPaginationData(this.postsToDisplay);


      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },
    onFilterUpdate(filterValue) {
      this.filter = filterValue;
      this.updateFilteredPosts();
    },
    setPaginationData(dataArray){
      this.currentPage = 1;
      this.totalPages = Math.ceil(dataArray.length / this.perPage);
    },
    updateFilteredPosts() {
      this.postsToDisplay = this.posts.filter(post => {
        const { title, body, user } = post;
        const postText = `${title} ${body} ${user?.name}`.toLowerCase();
        return postText.includes(this.filterLower);
      });
      this.setPaginationData(this.postsToDisplay);
    },
    onPageChange(page) {
      this.currentPage = Math.min(Math.max(page, 1), this.totalPages);
        window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
    },
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style scoped>.page_container {
  max-width: 1200px;
  margin: 0 auto;
}
.post_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px auto;
  min-height: 500px;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
