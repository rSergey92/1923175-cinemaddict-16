import MovieCardView from '../view/movie-card-view';
import FilmDetailsView from '../view/film-details-view';
import { generateComments } from '../mock/comments';
import { render, RenderPosition } from '../render';
import { replace, remove } from '../utils.js';

export default class MovieCardPresenter {
  #changeData = null;
  #filmCardComponent = null;
  #filmPopupComponent = null;
  #filmsListContainer = null;
  #filmDetails = null;
  #mainContainer = null

  #film = null;

  constructor(filmsListContainer, changeData) {
    this.#changeData = changeData;
    this.#filmsListContainer = filmsListContainer;
    this.#mainContainer = document.querySelector('.main');
    this.#filmDetails = document.querySelector('.film-details');
  }

  init = (film) => {
    this.#film = film;

    const prevfilmCardComponent = this.#filmCardComponent;
    const prevPopupComponent = this.#filmPopupComponent;

    this.#filmCardComponent = new MovieCardView(film);
    this.#filmPopupComponent = new FilmDetailsView(film, generateComments());

    this.#filmCardComponent.setClickHandler(this.#handleFilmCardClick);
    this.#filmCardComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmCardComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmPopupComponent.setCloseClickHandler(this.#handleCloseButtonClick);

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

  #handleWatchlistClick = () => {
    this.#changeData({...this.#film, userDetails: {...this.#film.userDetails, isWatchlist: !this.#film.userDetails.isWatchlist}});
  }

  #handleWatchedClick = () => {
    this.#changeData({...this.#film, userDetails: {...this.#film.userDetails, isWatched: !this.#film.userDetails.isWatched}});
  }

  #handleFavoriteClick = () => {
    this.#changeData({...this.#film, userDetails: {...this.#film.userDetails, isFavorite: !this.#film.userDetails.isFavorite}});
  }
}
