import { FilterTypes } from '../const';
import AbstractView from './abstract-view';

const NoMoviesTextExamples = {
  [FilterTypes.ALL]: 'ALL',
  [FilterTypes.FAVORITES]: 'Sorry, you have not added any movies to your favorites.',
  [FilterTypes.WATCHLIST]: 'Sorry, you have not added any movies to your watchlist.',
  [FilterTypes.WATCHED]: 'Unfortunately, you have not watched any of the films.',
};

const createEmptyListTemplate = (filterType) => {
  const noMoviesText = NoMoviesTextExamples[filterType];
  return (`<h2 class="films-list__title">${noMoviesText}</h2>`);
};

export default class EmptyListView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createEmptyListTemplate(this._data);
  }
}
