import MovieCardView from '../view/movie-card-view';
import FilmDetailsView from '../view/film-details-view';
import { generateComments } from '../mock/comments';
import { render, RenderPosition } from '../render';
import { replace, remove } from '../utils.js';

export default class MovieCardPresenter {
  #filmCardComponent = null;
  #filmPopupComponent = null;
  #film = null;
  #filmsListContainer = null;
  #filmDetails = null;
  #mainContainer = null

  constructor(filmsListContainer, film) {
    this.#filmsListContainer = filmsListContainer;
    this.#film = film;
    this.#mainContainer = document.querySelector('.main');
    this.#filmDetails = document.querySelector('.film-details');
  }

  init = () => {
    const prevfilmCardComponent = this.#filmCardComponent;
    const prevPopupComponent = this.#filmPopupComponent;

    this.#filmCardComponent = new MovieCardView(this.#film);
    this.#filmPopupComponent = new FilmDetailsView(this.#film, generateComments());

    this.#filmCardComponent.setClickHandler(this.#handleFilmCardClick);
    this.#filmPopupComponent.setEditClickHandler(this.#handleCloseButtonClick);

    if (prevfilmCardComponent === null || prevPopupComponent === null) {
      render(this.#filmsListContainer, this.#filmCardComponent.element, RenderPosition.BEFOREEND);

      return;
    }

    if (this.#filmsListContainer.contains(prevfilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevfilmCardComponent);
    }
    if (document.body.contains(prevPopupComponent.element)) {
      replace(this.#filmPopupComponent, prevPopupComponent);
    }
    remove(prevfilmCardComponent);
    remove(prevPopupComponent);
    render(this.#filmsListContainer, this.#filmCardComponent, RenderPosition.BEFOREEND);
  }

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#filmPopupComponent);
  }

  #showCardPopup = () => {
    this.#closePreviousPopup();
    document.body.classList.add('hide-overflow');
    render(this.#mainContainer, this.#filmPopupComponent.element, RenderPosition.BEFOREEND);
  }

  #closeCardPopup = () => {
    document.body.classList.remove('hide-overflow');
    this.#filmPopupComponent.element.remove();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #onEscKeyDown = (e) => {
    if (e.key === ('Escape' || 'Esc')) {
      e.preventDefault();
      this.#closeCardPopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  }

  #handleFilmCardClick = () => {
    this.#showCardPopup();
    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  #closePreviousPopup = () => {
    const oldPopup = document.querySelector('.film-details');
    if (oldPopup) {
      oldPopup.remove();
    }
  }

  #handleCloseButtonClick = () => {
    this.#closeCardPopup();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #watchListClick = () => {
    console.log('watchListClick');
  }

  #watchedClick = () => {
    console.log('watchedClick');
  }

  #favoriteClick = () => {
    console.log('stop');
  }
}
