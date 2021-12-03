import { createProfileTemplate } from './view/profile-view';
import { createSiteMenuTemplate } from './view/site-menu-view';
import { createMovieCardTemplate } from './view/movie-card-view';
import { createShowMoreTemplate } from './view/show-more-view';
import { createFilmDetailsTemplate } from './view/film-details-view';
import { renderTemplate, RenderPosition } from './render';
import { generateFilm } from './mock/films.js';

const FILMS_COUNT = 5;

const films = Array.from({length: FILMS_COUNT}, generateFilm);

const headerElement = document.querySelector('.header');

renderTemplate(headerElement, createProfileTemplate(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');

renderTemplate(siteHeaderElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);

const filmsElement = document.querySelector('.films');
const filmsListContainerElement = filmsElement.querySelector('.films-list__container');
const filmsListElement = filmsElement.querySelector('.films-list');

for (let i = 0; i < FILMS_COUNT; i++) {
  renderTemplate(filmsListContainerElement, createMovieCardTemplate(films[i]), RenderPosition.BEFOREEND);
}

renderTemplate(filmsListElement, createShowMoreTemplate(), RenderPosition.BEFOREEND);

const filmDetailsElement = document.querySelector('.film-details');

// renderTemplate(filmDetailsElement, createFilmDetailsTemplate(), RenderPosition.BEFOREEND);
