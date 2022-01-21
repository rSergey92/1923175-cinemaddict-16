import ProfileView from '../view/profile-view';
import SiteMenuView from '../view/site-menu-view';
import ShowMoreView from '../view/show-more-view';
import FilmListView from '../view/films-list-view';
import EmptyListView from '../view/empty-list-view.js';
import SortView from '../view/sort-view.js';
import { render, RenderPosition } from '../render';
import { remove, updateItem, sortFilmDate, sortFilmRating } from '../utils';
import { SortType } from '../const';
import MovieCardPresenter from './movie-card-presenter';

const FILM_COUNT_PER_STEP = 5;

export default class MovieListPresenter {
  #profileComponent = new ProfileView();
  #siteMenuComponent = new SiteMenuView();
  #filmListComponent = new FilmListView();
  #emptyListComponent = new EmptyListView();
  #sortComponent = new SortView();
  #loadMoreButton = new ShowMoreView();

  #films = [];
  #headerElement = null;
  #siteMainElement = null;
  #siteHeaderElement = null;

  #rerenderFilmCount = FILM_COUNT_PER_STEP;
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourceBoardFilms = [];

  constructor(films) {
    this.#films = [...films];
    this.#sourceBoardFilms = [...films];
  }

  init = () => {
    this.#headerElement = document.querySelector('.header');
    this.#siteMainElement = document.querySelector('.main');
    this.#siteHeaderElement = this.#siteMainElement.querySelector('.main__control');
    render(this.#siteMainElement, this.#filmListComponent.element, RenderPosition.BEFOREEND);

    this.#renderProfile();
    this.#renderSiteMenuView();
    this.#renderSort();
    this.#renderBoard();
  }

  #renderFilms = (from, to) => {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderCardFilm(film));
  }

  #renderCardFilm = (film) => {
    const filmPresenter = new MovieCardPresenter(
      this.#filmListComponent.element.querySelector('.films-list__container'),
      this.#handleFilmChange
    );

    filmPresenter.init(film);

    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #renderBoard = () => {
    if (this.#films.length < 1) {
      this.#renderEmptyList();
      return;
    }

    this.#renderFilmsList();
  }

  #renderFilmsList = () => {
    this.#renderFilms(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP));

    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  }

  #renderEmptyList = () => {
    render(this.#siteMainElement, this.#emptyListComponent.element, RenderPosition.BEFOREEND);
  }

  #renderProfile = () => {
    render(this.#headerElement, this.#profileComponent.element, RenderPosition.BEFOREEND);
  }

  #renderSiteMenuView = () => {
    render(this.#siteHeaderElement, this.#siteMenuComponent.element, RenderPosition.BEFOREEND);
  }

  #handleLoadMoreButtonClick = () => {
    this.#renderFilms(this.#rerenderFilmCount, this.#rerenderFilmCount + FILM_COUNT_PER_STEP);
    this.#rerenderFilmCount += FILM_COUNT_PER_STEP;

    if (this.#rerenderFilmCount >= this.#films.length) {
      remove(this.#loadMoreButton);
    }
  }

  #renderLoadMoreButton = () => {
    render(this.#siteMainElement, this.#loadMoreButton.element, RenderPosition.BEFOREEND);
    this.#loadMoreButton.setClickHandler(() => this.#handleLoadMoreButtonClick());
  }

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#rerenderFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#loadMoreButton);
  }

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#sourceBoardFilms = updateItem(this.#sourceBoardFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  }

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#films.sort(sortFilmDate);
        break;
      case SortType.RATING:
        this.#films.sort(sortFilmRating);
        break;
      default:
        this.#films = [...this.#sourceBoardFilms];
    }

    this.#currentSortType = sortType;
  }

  #handlerSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmList();
    this.#renderFilmsList();
  }

  #renderSort = () => {
    render(this.#siteHeaderElement, this.#sortComponent.element, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handlerSortTypeChange);
  }
}
