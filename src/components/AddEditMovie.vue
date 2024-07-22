<template>
  <div class="add-edit-movie">
    <h1>{{ isEditMode ? 'Редактировать фильм' : 'Добавить новый фильм' }}</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Название:</label>
        <input id="title" v-model="movie.title" required />
      </div>
      <div class="form-group">
        <label for="year">Год:</label>
        <input id="year" type="number" v-model="movie.year" required />
      </div>
      <div class="form-group">
        <label for="genre">Жанр:</label>
        <input id="genre" v-model="movie.genre" required />
      </div>
      <div class="form-group">
        <label for="rating">Рейтинг:</label>
        <input id="rating" type="number" min="1" max="10" v-model="movie.rating" required />
      </div>
      <div class="form-group">
        <label for="description">Описание:</label>
        <textarea id="description" v-model="movie.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="image">Изображение:</label>
        <input id="image" type="file" @change="handleFileChange" />
      </div>
      <button type="submit">{{ isEditMode ? 'Обновить' : 'Добавить' }} Фильм</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const movieId = Number(route.params.id);

    const initialMovie = {
      id: movieId || Date.now(),
      title: '',
      year: new Date().getFullYear(),
      genre: '',
      rating: 1,
      description: '',
      image: ''
    };

    const movie = ref(movieId ? { ...store.getters.getMovieById(movieId) } : initialMovie);
    const isEditMode = computed(() => !!movieId);

    const handleFileChange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          movie.value.image = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = () => {
      if (isEditMode.value) {
        store.dispatch('updateMovie', movie.value);
      } else {
        store.dispatch('addMovie', movie.value);
      }
      const currentMovieId = movie.value.id;
      router.push({ name: 'details', params: { id: currentMovieId } });
    };

    return {
      movie,
      isEditMode,
      handleFileChange,
      handleSubmit
    };
  }
});
</script>

<style scoped>
.add-edit-movie {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.add-edit-movie h1 {
  font-size: 2em;
  margin-bottom: 1em;
}

.form-group {
  margin-bottom: 1em;
}

.form-group label {
  display: block;
  margin-bottom: 0.5em;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

button {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
