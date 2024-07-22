import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AddEditMovieView from '../views/AddEditMovieView.vue';
import MovieDetailsView from '../views/MovieDetailsView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/add', name: 'add', component: AddEditMovieView },
  { path: '/edit/:id', name: 'edit', component: AddEditMovieView },
  { path: '/details/:id', name: 'details', component: MovieDetailsView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
