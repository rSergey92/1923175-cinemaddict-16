import SmartView from './smart-view';
import { nanoid } from 'nanoid';
import he from 'he';

const createMovieGenre = (geners) => (
  geners ? geners.split(' ').map((genre) => `<span class="film-details__genre">${genre}</span>`).join('') : ''
);

const createFilmDetailsTemplate = (film, comments) => (`
<section class="film-details">
<form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${film.filmInfo.poster}" alt="">

          <p class="film-details__age">${film.filmInfo.ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${film.filmInfo.title}</h3>
              ${film.filmInfo.alternativeTitle ? `<p class="film-details__title-original">Original: ${film.filmInfo.alternativeTitle}</p>` : ''}
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${film.filmInfo.totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${film.filmInfo.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${film.filmInfo.writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${film.filmInfo.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${film.filmInfo.release.fullDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${film.filmInfo.runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${film.filmInfo.release.releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${createMovieGenre(film.filmInfo.genre)}
            </tr>
          </table>

          <p class="film-details__film-description">
            The film opens following a murder at a cabaret in Mexico City in 1936,
            and then presents the events leading up to it in flashback.
            The Great Flamarion (Erich von Stroheim) is an arrogant, friendless,
            and misogynous marksman who displays his trick gunshot act in the vaudeville circuit.
            His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea),
            Flamarion's other assistant. Flamarion falls in love with Connie, the movie's femme fatale,
            and is soon manipulated by her into killing her no good husband during one of their acts.
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button"
            class="film-details__control-button ${film.isAddedToWatchList ? 'film-details__control-button--active' : ''}
            film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button"
            class="film-details__control-button ${film.isWatched ? 'film-details__control-button--active' : ''}
            film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${film.isAddedToFavorite ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.count}</span></h3>

        <ul class="film-details__comments-list">
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${comments.emoji}" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${comments.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comments.info.author ? comments.info.author : ''}</span>
                <span class="film-details__comment-day">${comments.info.day ? comments.info.day : ''}</span>
                <button id="${comments.id}" class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
        </ul>

        <div class="film-details__new-comment">
        <div class="film-details__add-emoji-label">${film.isEmotion ? `<img src="images/emoji/${film.activeEmoji}.png" width="55" height="55" alt="emoji-${film.activeEmoji}">` : ''}</div>


          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="smile" value="smile">
            <label class="film-details__emoji-label" for="smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="puke" value="puke">
            <label class="film-details__emoji-label" for="puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="angry" value="angry">
            <label class="film-details__emoji-label" for="angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`
);

export default class FilmDetailsView extends SmartView {
  #comments = null;

  constructor(film, comments) {
    super();
    this._data = FilmDetailsView.parseFilmToData(film);

    this.#comments = comments;
    this.#setInnerHandlers();
  }

  get template() {
    return createFilmDetailsTemplate(this._data, this.#comments);
  }

  setCloseClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeClickHandler);
  }

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }

  reset = (film) => {
    this.updateData(
      FilmDetailsView.parseFilmToData(film),
    );
  }

  static parseFilmToData = (film) => ({
    ...film,
    scrollPosition: 0,
    isEmotion: false,
    activeEmoji: '',
    textComment: '',
  });

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#emojiClickHandler);
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeButtonClickHandler);
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedClickHandler);
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchListClickHandler);
    this.element.addEventListener('scroll', this.#scrollPositionHandler);
  }

  #emojiClickHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.updateData({
      isEmotion: true,
      activeEmoji: evt.target.id,
    });
  }

  #closeButtonClickHandler = (evt) => {
    evt.preventDefault();
    return this._callback.closeButton ? this._callback.closeButton() : '';
  };

  setCloseButtonHandler = (callback) => {
    this._callback.closeButton = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeButtonClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favorite = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watched = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedClickHandler);
  };

  setWatchingListClickHandler = (callback) => {
    this._callback.watchingList = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchListClickHandler);
  };

  setDeleteCommentButtonClickHandler = (callback) => {
    this._callback.deleteCommentClick = callback;
    const buttons = this.element.querySelectorAll('.film-details__comment-delete');
    if(buttons){
      buttons.forEach((button) => {button.addEventListener('click', this.#deleteCommentClick);});
    }
  }

  #deleteCommentClick = (evt) => {
    if(evt.target.tagName !== 'BUTTON'){
      return;
    }
    evt.preventDefault();
    this._callback.deleteCommentClick(evt.target.id);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favorite();
  };

  #watchListClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchingList();
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watched();
  };

  #scrollPositionHandler = () => {
    this.updateData({
      scrollPosition: this.element.scrollTop,
    }, true);
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseClickHandler(this._callback.click);
  }

  setSubmitFormClickHandler = (callback) =>{
    this._callback.submitComment = callback;
    document.addEventListener('keydown', this.#submitFormKeyDown);
  }

  #submitFormKeyDown = (evt) => {
    if(evt.key === 'Enter' && evt.key === 'Control' && evt.which === 13 && evt.which === 17){//Условие не срабатывает
      const newComment = {
        id: nanoid(),
        commentText: he.encode(this.element.querySelector('.film-details__comment-input').value),
        emotion: this.element.querySelector('.comment-emoji').src,
      };
      this._callback.submitComment(newComment);
    }
  }
}
