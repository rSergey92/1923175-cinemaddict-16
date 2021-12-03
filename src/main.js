import { createProfileTemplate } from './view/profile-view';
import { createSiteMenuTemplate } from './view/site-menu-view';
import { createMovieCardTemplate } from './view/movie-card-view';
import { createShowMoreTemplate } from './view/show-more-view';
import { createFilmDetailsTemplate } from './view/film-details-view';
import { renderTemplate, RenderPosition } from './render';

const FILMS_COUNT = 5;

const headerElement = document.querySelector('.header');

renderTemplate(headerElement, createProfileTemplate(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');

renderTemplate(siteHeaderElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);

const filmsElement = document.querySelector('.films');
const filmsListContainerElement = filmsElement.querySelector('.films-list__container');
const filmsListElement = filmsElement.querySelector('.films-list');

for (let i = 0; i < FILMS_COUNT; i++) {
  renderTemplate(filmsListContainerElement, createMovieCardTemplate(), RenderPosition.BEFOREEND);
}

renderTemplate(filmsListElement, createShowMoreTemplate(), RenderPosition.BEFOREEND);

const filmDetailsElement = document.querySelector('.film-details');

renderTemplate(filmDetailsElement, createFilmDetailsTemplate(), RenderPosition.BEFOREEND);
