import MovieListPresenter from './presenter/movie-list-presenter';
import { generateFilm } from './mock/films';

const FILMS_COUNT = 20;

const films = Array.from({length: FILMS_COUNT}, generateFilm);

new MovieListPresenter(films).init();
