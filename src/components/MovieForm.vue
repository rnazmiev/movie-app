<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="title">Название:</label>
      <input id="title" v-model="movie.title" required />
    </div>
    <div>
      <label for="year">Год:</label>
      <input id="year" type="number" v-model="movie.year" required />
    </div>
    <div>
      <label for="genre">Жанр:</label>
      <input id="genre" v-model="movie.genre" required />
    </div>
    <div>
      <label for="rating">Рейтинг:</label>
      <input id="rating" type="number" min="1" max="10" v-model="movie.rating" required />
    </div>
    <div>
      <label for="description">Описание:</label>
      <textarea id="description" v-model="movie.description" required></textarea>
    </div>
    <div>
      <label for="image">Изображение:</label>
      <input id="image" type="file" @change="handleFileChange" />
    </div>
    <button type="submit">{{ isEditMode ? 'Обновить' : 'Добавить' }} Фильм</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    movie: {
      type: Object as PropType<{ title: string, year: number, genre: string, rating: number, description: string, image: string, id?: number }>,
      required: false,
      default: () => ({ title: '', year: 0, genre: '', rating: 0, description: '', image: '' })
    }
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const movie = ref({ ...props.movie });

    const isEditMode = computed(() => !!movie.value.id);

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
        movie.value.id = Date.now();
        store.dispatch('addMovie', movie.value);
      }
      router.push('/');
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
/* Добавьте стили для формы */
</style>
