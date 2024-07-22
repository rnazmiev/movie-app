<template>
  <div>
    <h1>Коллекция фильмов</h1>
    <router-link to="/add">Добавить новый фильм</router-link>
    <div class="movie-list">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import MovieCard from '../components/MovieCard.vue';

export default defineComponent({
  components: { MovieCard },
  setup() {
    const store = useStore();
    const movies = store.state.movies;

    return { movies };
  }
});
</script>

<style scoped>
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 30px; 
}
@media (max-width: 768px) {
  .movie-list {
    flex-direction: column;
    align-items: center;
  }
}
</style>
