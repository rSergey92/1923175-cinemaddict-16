import ProfileView from '../view/profile-view';
import ShowMoreView from '../view/show-more-view';
import FilmListView from '../view/films-list-view';
import EmptyListView from '../view/empty-list-view.js';
import SortView from '../view/sort-view.js';
import { render, RenderPosition } from '../render';
import { remove, sortFilmDate, sortFilmRating } from '../utils';
import { UpdateType, SortType, FilterTypes } from '../const';
import { filter } from '../utils/filters';
import MovieCardPresenter from './movie-card-presenter';

const FILM_COUNT_PER_STEP = 5;

export default class MovieListPresenter {
  #profileComponent = new ProfileView();
  #filmListComponent = new FilmListView();
  #sortComponent = null;
  #loadMoreButton = null;

  #headerElement = null;
  #siteMainElement = null;
  #siteHeaderElement = null;
  #moviesModel = null;
  #noFilmsComponent = null;
  #filtersModel = null

  #rerenderFilmCount = FILM_COUNT_PER_STEP;
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterTypes.ALL;

  constructor(moviesModel, filtersModel) {
    this.#moviesModel = moviesModel;
    this.#filtersModel = filtersModel;

    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    this.#filterType = this.#filtersModel.filter;
    const films = this.#moviesModel.films;
    const filteredFilms = filter[this.#filterType](films);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortFilmDate);
      case SortType.RATING:
        return filteredFilms.sort(sortFilmRating);
    }

    return filteredFilms;
  }

  init = () => {
    this.#headerElement = document.querySelector('.header');
    this.#siteMainElement = document.querySelector('.main');
    this.#siteHeaderElement = this.#siteMainElement.querySelector('.main__control');
    render(this.#siteMainElement, this.#filmListComponent.element, RenderPosition.BEFOREEND);

    this.#renderProfile();
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  }

  #renderFilms = (films) => {
    films.forEach((film) => this.#renderCardFilm(film));
  }

  #renderCardFilm = (film) => {
    const filmPresenter = new MovieCardPresenter(
      this.#filmListComponent.element.querySelector('.films-list__container'),
      this.#handleViewAction,
      this.#handleModeChange,
    );

    filmPresenter.init(film);

    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #renderBoard = () => {
    const films = this.films;
    const filmCount = films.length;

    if (filmCount === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderSort();

    this.#renderFilms(films.slice(0, Math.min(filmCount, this.#rerenderFilmCount)));

    if (filmCount > this.#rerenderFilmCount) {
      this.#renderLoadMoreButton();
    }
  }

  #renderNoFilms = () => {
    this.#noFilmsComponent = new EmptyListView(this.#filterType);
    render(this.#siteMainElement, this.#noFilmsComponent.element, RenderPosition.BEFOREEND);
  }

  #renderProfile = () => {
    render(this.#headerElement, this.#profileComponent.element, RenderPosition.BEFOREEND);
  }

  #handleLoadMoreButtonClick = () => {
    const filmCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#rerenderFilmCount + FILM_COUNT_PER_STEP);
    const films = this.films.slice(this.#rerenderFilmCount, newRenderedFilmCount);

    this.#rerenderFilmCount = newRenderedFilmCount;
    this.#renderFilms(films);

    if (this.#rerenderFilmCount >= filmCount) {
      remove(this.#loadMoreButton);
    }
  }

  #renderLoadMoreButton = () => {
    this.#loadMoreButton = new ShowMoreView();
    this.#loadMoreButton.setClickHandler(() => this.#handleLoadMoreButtonClick());
    render(this.#siteMainElement, this.#loadMoreButton.element, RenderPosition.BEFOREEND);
  }

  #handlerSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedFilmCount: true});
    this.#renderBoard();
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handlerSortTypeChange);

    render(this.#siteHeaderElement, this.#sortComponent.element, RenderPosition.BEFOREEND);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case FilterTypes.FAVORITES:
        this.#moviesModel.updateFilms(updateType, update);
        break;
      case  FilterTypes.WATCHLIST:
        this.#moviesModel.updateFilms(updateType, update);
        break;
      case FilterTypes.WATCHED:
        this.#moviesModel.updateFilms(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedMoviesCount: true, resetSortType: true});
        this.#renderBoard();
        break;
    }
  }

  #clearBoard = ({resetRenderedFilmCount = false, resetSortType = false} = {}) => {
    const filmCount = this.films.length;

    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadMoreButton);

    if (this.#noFilmsComponent) {
      remove(this.#noFilmsComponent);
    }

    if (resetRenderedFilmCount) {
      this.#rerenderFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this.#rerenderFilmCount = Math.min(filmCount, this.#rerenderFilmCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }
}
