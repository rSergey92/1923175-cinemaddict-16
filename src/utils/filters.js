import { FilterTypes } from '../const';

export const filter = {
  [FilterTypes.ALL]: (films) => films,
  [FilterTypes.FAVORITES]: (films) => films.filter((film) => film.isAddedToFavorite),
  [FilterTypes.WATCHLIST]: (films) => films.filter((film) => film.isAddedToWatchList),
  [FilterTypes.WATCHED]: (films) => films.filter((film) => film.isWatched),
};
