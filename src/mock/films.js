import dayjs from 'dayjs';
import {
  FILM_TITLE,
  FILM_DESCRIPTION,
  POSTERS,
  GENRES,
} from '../const';

import {
  getRandomInteger,
  shuffleArray,
  formattedTime,
  randomDate,
} from '../utils';

const generateRating = () => parseFloat((Math.random() * 10).toFixed(2));

const generateTitle = () => {
  const randomIndex = getRandomInteger(0, FILM_TITLE.length - 1);

  return FILM_TITLE[randomIndex];
};

const generateDescription = () => {
  const description = FILM_DESCRIPTION.split('.');

  const randomIndex = getRandomInteger(1, 5);

  return shuffleArray(description).slice(1, randomIndex).join('.');
};

const generateCountComments = () => getRandomInteger(0, 5);
const getPosterFromTitle = (title) => POSTERS
  .find((poster) => poster.split('.')[0] === title.split(' ').join('-').toLowerCase());

const generateGenres = () => shuffleArray(GENRES).splice(getRandomInteger(0, GENRES.length)).join(' ');
const generateFullDate = () => dayjs(randomDate('01.01.1900', '01.01.2021')).format('DD MMMM YYYY');
const generateYear = () => dayjs(generateFullDate()).format('YYYY');

export const generateFilm = () => {
  const title = generateTitle();

  return {
    comments: generateCountComments(),
    filmInfo: {
      title,
      alternativeTitle: 'Laziness Who Sold Themselves',
      totalRating: generateRating(),
      poster: `./images/posters/${getPosterFromTitle(title)}`,
      ageRating: getRandomInteger(0, 18),
      director: 'Tom Ford',
      writers: [
        'Takeshi Kitano'
      ],
      actors: [
        'Morgan Freeman'
      ],
      release: {
        date: generateYear(),
        fullDate: generateFullDate(),
        releaseCountry: 'Finland'
      },
      runtime: formattedTime(getRandomInteger(60, 500)),
      genre: generateGenres(),
      description: generateDescription(),
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: false
    },
  };
};
