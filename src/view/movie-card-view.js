import AbstractView from './abstract-view';

const createMovieCardTemplate = (film) => (
  `<aticle class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${film.filmInfo.title}</h3>
            <p class="film-card__rating">${film.filmInfo.totalRating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${film.filmInfo.release.date}</span>
              <span class="film-card__duration">${film.filmInfo.runtime}</span>
              <span class="film-card__genre">${film.filmInfo.genre}</span>
            </p>
            <img src="${film.filmInfo.poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${film.filmInfo.description}</p>
            <span class="film-card__comments">${film.comments} comments</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>
  `
);

export default class MovieCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createMovieCardTemplate(this.#film);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }

  setWatchlistClickHandler = (callback) => {
    this._callback.watchListClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchListClick);
  }

  #watchListClick = (evt) => {
    evt.stopPropagation();
    this._callback.watchListClick();
  }

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedClickHandler);
  }

  #watchedClickHandler = (evt) => {
    evt.stopPropagation();
    this._callback.watchedClick();
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  #favoriteClickHandler = (evt) => {
    evt.stopPropagation();
    this._callback.favoriteClick();
  }
}
