import { createProfileTemplate } from './view/profile-view';
import { createSiteMenuTemplate } from './view/site-menu-view';
import { createMovieCardTemplate } from './view/movie-card-view';
import { createShowMoreTemplate } from './view/show-more-view';
import { createFilmDetailsTemplate } from './view/film-details-view';
import { renderTemplate, RenderPosition } from './render';
import { generateFilm } from './mock/films';
import { generateComments } from './mock/comments';

const FILMS_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;

const films = Array.from({length: FILMS_COUNT}, generateFilm);

const headerElement = document.querySelector('.header');

renderTemplate(headerElement, createProfileTemplate(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');

renderTemplate(siteHeaderElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);

const filmsElement = document.querySelector('.films');
const filmsListContainerElement = filmsElement.querySelector('.films-list__container');
const filmsListElement = filmsElement.querySelector('.films-list');

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderTemplate(filmsListContainerElement, createMovieCardTemplate(films[i]), RenderPosition.BEFOREEND);
}

const filmDetailsElement = document.querySelector('.film-details');

renderTemplate(filmDetailsElement, createFilmDetailsTemplate(films[0], generateComments()), RenderPosition.BEFOREEND);

if (films.length > FILM_COUNT_PER_STEP) {
  let rerenderFilmCount = FILM_COUNT_PER_STEP;

  renderTemplate(filmsListElement, createShowMoreTemplate(), RenderPosition.BEFOREEND);

  const loadMoreButton = document.querySelector('.films-list__show-more');

  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      films
        .slice(rerenderFilmCount, rerenderFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => renderTemplate(filmsListContainerElement, createMovieCardTemplate(film), RenderPosition.BEFOREEND));
    });

    rerenderFilmCount += FILM_COUNT_PER_STEP;

    if (rerenderFilmCount >= films.length) {
      loadMoreButton.remove();
    }
  }
}
