<template>
    <div class="post-card">
        <h2>{{ post.title }}</h2>
        <p><strong>User:</strong> {{ post.user.name }}</p>
        <p>{{ post.body }}</p>
    </div>
</template>
  
<script>
export default {
    name: 'PostCard',
    props: {
        post: Object
    },
    data: function () {
        return {}
    },
    watch: {

    },
    computed: {

    },
    methods: {

    },
    mounted() {}
}
</script>
  
<style scoped>
.post-card {
    box-sizing: border-box;
    width: 30%;
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    transition: box-shadow 0.3s ease-in-out;
}

.post-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.post-card h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #333;
}

.post-card p {
    font-size: 1rem;
    color: #666;
}

.post-card .author {
    margin-top: 10px;
    font-size: 0.9rem;
    color: #888;
}
</style>
  