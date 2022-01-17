import MovieCardPresenter from './presenter/movie-card-presenter';
import { generateFilm } from './mock/films';

const FILMS_COUNT = 20;

const films = Array.from({length: FILMS_COUNT}, generateFilm);

new MovieCardPresenter(films).init();
