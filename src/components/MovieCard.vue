<template>
  <div class="movie-card">
    <h2>{{ movie.title }}</h2>
    <p>Год: {{ movie.year }}</p>
    <p>Рейтинг: {{ movie.rating }}</p>
    <router-link :to="{ name: 'details', params: { id: movie.id } }">Описание</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  description: string;
  image: string;
}

export default defineComponent({
  props: {
    movie: {
      type: Object as PropType<Movie>,
      required: true
    }
  }
});
</script>

<style scoped>
.movie-card {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 200px;
  text-align: left;
}

.movie-card h3 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.movie-card p {
  margin: 5px 0;
}

.movie-card a {
  display: inline-block;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.movie-card a:hover {
  background-color: #0056b3;
}
</style>
