import MovieListPresenter from './presenter/movie-list-presenter';
import MoviesModel from './model/movies-model';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import { generateFilm } from './mock/films';

const FILMS_COUNT = 20;

const films = Array.from({length: FILMS_COUNT}, generateFilm);
const moviesModel = new MoviesModel();
const filtersModel = new FilterModel();
moviesModel.films = films;

const siteMainElement = document.querySelector('.main');
const filterPresenter = new FilterPresenter(siteMainElement, moviesModel, filtersModel);

filterPresenter.init();
new MovieListPresenter(moviesModel, filtersModel).init();
