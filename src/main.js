import ProfileView from './view/profile-view';
import SiteMenuView from './view/site-menu-view';
import MovieCardView from './view/movie-card-view';
import ShowMoreView from './view/show-more-view';
import FilmListView from './view/films-list-view';
import FilmDetailsView from './view/film-details-view';
import EmptyListView from './view/empty-list-view.js';
import { render, RenderPosition } from './render';
import { generateFilm } from './mock/films';
import { generateComments } from './mock/comments';

const FILMS_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;

const films = Array.from({length: FILMS_COUNT}, generateFilm);

const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');
const filmDetails = document.querySelector('.film-details');

const renderFilm = (filmListElement, film) => {
  const filmComponent = new MovieCardView(film);

  const openPopup = (filmObject) => {
    const filmPopupComponent = new FilmDetailsView(filmObject, generateComments());
    document.body.classList.add('hide-overflow');
    render(filmDetails, filmPopupComponent.element, RenderPosition.BEFOREEND);

    const closePopup = () => {
      document.body.classList.remove('hide-overflow');
      filmDetails?.removeChild(filmPopupComponent.element);
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

  render(filmListElement, filmComponent.element, RenderPosition.BEFOREEND);
};

render(headerElement, new ProfileView().element, RenderPosition.BEFOREEND);

render(siteHeaderElement, new SiteMenuView().element, RenderPosition.BEFOREEND);

const filmListComponent = new FilmListView();

if (films.length > 0) {
  render(siteMainElement, filmListComponent.element, RenderPosition.BEFOREEND);

  for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
    renderFilm(
      filmListComponent.element.querySelector('.films-list__container'),
      films[i],
    );
  }

  if (films.length > FILM_COUNT_PER_STEP) {
    let rerenderFilmCount = FILM_COUNT_PER_STEP;
    const loadMoreButton = new ShowMoreView();

    render(siteMainElement, loadMoreButton.element, RenderPosition.BEFOREEND);

    if (loadMoreButton) {
      loadMoreButton.setClickHandler(() => {
        films
          .slice(rerenderFilmCount, rerenderFilmCount + FILM_COUNT_PER_STEP)
          .forEach((film) => renderFilm(filmListComponent.element, film));
      });

      rerenderFilmCount += FILM_COUNT_PER_STEP;

      if (rerenderFilmCount >= films.length) {
        loadMoreButton.remove();
      }
    }
  }
} else {
  render(siteMainElement, new EmptyListView().element, RenderPosition.BEFOREEND);
}
