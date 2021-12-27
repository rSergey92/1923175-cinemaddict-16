import ProfileView from './view/profile-view';
import SiteMenuView from './view/site-menu-view';
import MovieCardView from './view/movie-card-view';
import ShowMoreView from './view/show-more-view';
import FilmListView from './view/films-list-view';
import FilmDetailsView from './view/film-details-view';
import { render, RenderPosition } from './render';
import { generateFilm } from './mock/films';
import { generateComments } from './mock/comments';

const FILMS_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;

const films = Array.from({length: FILMS_COUNT}, generateFilm);

const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');

const renderFilm = (filmListElement, film) => {
  const filmComponent = new MovieCardView(film);

  render(filmListElement, filmComponent.element, RenderPosition.BEFOREEND);
};

render(headerElement, new ProfileView().element, RenderPosition.BEFOREEND);

render(siteHeaderElement, new SiteMenuView().element, RenderPosition.BEFOREEND);

const filmListComponent = new FilmListView();

render(siteMainElement, filmListComponent.element, RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderFilm(
    filmListComponent.element.querySelector('.films-list__container'),
    films[i],
  );
}

if (films.length > FILM_COUNT_PER_STEP) {
  let rerenderFilmCount = FILM_COUNT_PER_STEP;

  render(siteMainElement, new ShowMoreView().element, RenderPosition.BEFOREEND);

  const loadMoreButton = document.querySelector('.films-list__show-more');

  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();
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
