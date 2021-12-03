import dayjs from 'dayjs';
import {
  FILM_TITLE,
  FILM_DESCRIPTION,
  FILM_POSTERS,
} from './constants';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateRating = () => parseFloat((Math.random() * 10).toFixed(2));

const generateTitle = () => {
  const randomIndex = getRandomInteger(0, FILM_TITLE.length - 1);

  return FILM_TITLE[randomIndex];
};

const generatePoster = () => {
  const randomIndex = getRandomInteger(0, FILM_POSTERS.length - 1);

  return FILM_POSTERS[randomIndex];
};

const generateDescription = () => {
  const description = FILM_DESCRIPTION.split('.');

  const randomIndex = getRandomInteger(1, 5);

  return description.slice(1, randomIndex).join('.');
};

const generateCountComments = () => getRandomInteger(0, 5);

const generateYear = () => dayjs()
  .set('year', getRandomInteger(1900, new Date().getFullYear()))
  .format('YYYY');

export const generateFilm = () => ({
  title: generateTitle(),
  rating: generateRating(),
  info: {
    year: generateYear(),
    duration: '1h 55m',
    genre: 'Musical',
  },
  poster: `./images/posters/${generatePoster()}`,
  description: generateDescription(),
  comments: generateCountComments(),
});
