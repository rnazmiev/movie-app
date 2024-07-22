<template>
  <div class="movie-details">
    <h1>{{ movie?.title }}</h1>
    <p><strong>Год:</strong> {{ movie?.year }}</p>
    <p><strong>Жанр:</strong> {{ movie?.genre }}</p>
    <p><strong>Рейтинг:</strong> {{ movie?.rating }}</p>
    <p><strong>Описание:</strong> {{ movie?.description }}</p>
    <img :src="movie?.image" alt="Movie Image" />
    <div class="actions">
      <router-link :to="{ name: 'edit', params: { id: movie?.id } }">Редактировать</router-link>
      <button class="" @click="handleDelete">Удалить</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const movieId = Number(route.params.id);

    const movie = computed(() => store.getters.getMovieById(movieId));

    const handleDelete = () => {
      if (confirm('Are you sure you want to delete this movie?')) {
        store.dispatch('deleteMovie', movieId);
        router.push('/');
      }
    };

    return {
      movie,
      handleDelete
    };
  }
});
</script>

<style scoped>
.movie-details {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.movie-details h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

.movie-details p {
  margin: 0.5em 0;
}

.movie-details img {
  max-width: 100%;
  height: auto;
  margin-top: 1em;
  border-radius: 8px;
}

.movie-details .actions {
  margin-top: 1.5em;
}

.movie-details .actions router-link,
.movie-details .actions button {
  display: inline-block;
  margin: 0px 10px;
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.movie-details .actions button {
  background-color: #dc3545;
}

.movie-details .actions router-link:hover,
.movie-details .actions button:hover {
  background-color: #0056b3;
}

.movie-details .actions button:hover {
  background-color: #c82333;
}
</style>
