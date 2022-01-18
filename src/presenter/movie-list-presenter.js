import ProfileView from '../view/profile-view';
import SiteMenuView from '../view/site-menu-view';
import ShowMoreView from '../view/show-more-view';
import FilmListView from '../view/films-list-view';
import EmptyListView from '../view/empty-list-view.js';
import SortView from '../view/sort-view.js';
import { render, RenderPosition } from '../render';
import { remove } from '../utils';
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

  constructor(films) {
    this.#films = [...films];
  }

  init = () => {
    this.#headerElement = document.querySelector('.header');
    this.#siteMainElement = document.querySelector('.main');
    this.#siteHeaderElement = this.#siteMainElement.querySelector('.main__control');
    render(this.#siteMainElement, this.#filmListComponent.element, RenderPosition.BEFOREEND);

    this.#renderProfile();
    this.#renderSiteMenuView();
    this.#sortList();
    this.#renderBoard();
  }

  #renderFilms = (from, to) => {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderCardFilm(film));
  }

  #sortList = () => {
    render(this.#siteHeaderElement, this.#sortComponent.element, RenderPosition.BEFOREEND);
  }

  #renderCardFilm = (film) => {
    new MovieCardPresenter(
      this.#filmListComponent.element.querySelector('.films-list__container'),
      film,
    ).init();
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
}
