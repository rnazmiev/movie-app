import { createStore } from 'vuex';

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  description: string;
  image: string;
}

export default createStore({
  state: {
    movies: [] as Movie[]
  },
  getters: {
    getMovieById: (state) => (id: number) => {
      return state.movies.find(movie => movie.id === id);
    }
  },
  mutations: {
    ADD_MOVIE(state, movie: Movie) {
      state.movies.push(movie);
    },
    UPDATE_MOVIE(state, updatedMovie: Movie) {
      const index = state.movies.findIndex(movie => movie.id === updatedMovie.id);
      if (index !== -1) {
        state.movies[index] = updatedMovie;
      }
    },
    DELETE_MOVIE(state, id: number) {
      state.movies = state.movies.filter(movie => movie.id !== id);
    }
  },
  actions: {
    addMovie({ commit }, movie: Movie) {
      commit('ADD_MOVIE', movie);
    },
    updateMovie({ commit }, movie: Movie) {
      commit('UPDATE_MOVIE', movie);
    },
    deleteMovie({ commit }, id: number) {
      commit('DELETE_MOVIE', id);
    }
  },
  modules: {}
});
