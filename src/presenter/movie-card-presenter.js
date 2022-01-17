import ProfileView from '../view/profile-view';
import SiteMenuView from '../view/site-menu-view';
import MovieCardView from '../view/movie-card-view';
import ShowMoreView from '../view/show-more-view';
import FilmListView from '../view/films-list-view';
import FilmDetailsView from '../view/film-details-view';
import EmptyListView from '../view/empty-list-view.js';
import SortView from '../view/sort-view.js';
import { render, RenderPosition } from '../render';
import { remove } from '../utils';
import { generateComments } from '../mock/comments';

const FILM_COUNT_PER_STEP = 5;

export default class MovieCardPresenter {
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
  #filmDetails = null;

  #rerenderFilmCount = FILM_COUNT_PER_STEP;

  constructor(films) {
    this.#films = [...films];
  }

  init = () => {
    this.#headerElement = document.querySelector('.header');
    this.#siteMainElement = document.querySelector('.main');
    this.#siteHeaderElement = this.#siteMainElement.querySelector('.main__control');
    this.#filmDetails = document.querySelector('.film-details');
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
    const filmComponent = new MovieCardView(film);

    const openPopup = (filmObject) => {
      const filmPopupComponent = new FilmDetailsView(filmObject, generateComments());

      document.body.classList.add('hide-overflow');
      render(this.#filmDetails, filmPopupComponent.element, RenderPosition.BEFOREEND);

      const closePopup = () => {
        document.body.classList.remove('hide-overflow');
        this.#filmDetails?.removeChild(filmPopupComponent.element);
      };

      const onEscKeyDown = (e) => {
        if (e.key === ('Escape' || 'Esc')) {
          e.preventDefault();
          closePopup();
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };

      filmPopupComponent.setEditClickHandler(closePopup);

      document.addEventListener('keydown', onEscKeyDown);
    };

    filmComponent.setClickHandler(() => openPopup(film));

    render(this.#filmListComponent.element.querySelector('.films-list__container'),
      filmComponent.element, RenderPosition.BEFOREEND);
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
