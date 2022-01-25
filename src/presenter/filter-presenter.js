import FilterView from '../view/site-menu-view';
import { render, RenderPosition } from '../render';
import { remove, replace } from '../utils';
import { FilterTypes, UpdateType } from '../const.js';
import { filter } from '../utils/filters';

export default class FilterPresenter {
  #filterComponent = null;
  #renderPlace = null;
  #movieModel = null;
  #filterModel = null;

  constructor(renderPlace, moviesModel, filterModel) {
    this.#renderPlace = renderPlace;
    this.#movieModel = moviesModel;
    this.#filterModel = filterModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#movieModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const films = this.#movieModel.films;

    return [
      {
        type: FilterTypes.ALL,
        name: 'All movies',
        count: filter[FilterTypes.ALL](films).length,
      },
      {
        type: FilterTypes.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterTypes.WATCHLIST](films).length,
      },
      {
        type: FilterTypes.WATCHED,
        name: 'Watched',
        count: filter[FilterTypes.WATCHED](films).length,
      },
      {
        type: FilterTypes.FAVORITES,
        name: 'Favorites',
        count: filter[FilterTypes.FAVORITES](films).length,
      },
    ];
  }

  init = () =>{
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if(prevFilterComponent === null) {
      render(this.#renderPlace, this.#filterComponent.element, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
