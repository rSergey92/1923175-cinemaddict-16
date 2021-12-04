import { getRandomInteger, countDate, randomDate } from '../utils';
import { EMOJI, COMMENT_TEXT } from '../const';

const generateText = () => {
  const randomIndex = getRandomInteger(0, COMMENT_TEXT.length - 1);

  return EMOJI[randomIndex];
};

const generateEmoji = () => {
  const randomIndex = getRandomInteger(0, EMOJI.length - 1);

  return EMOJI[randomIndex];
};
const generateAuthor = () => {};

const generateDay = () => countDate(randomDate('01.01.1970', new Date())) === 0
  ? 'Today'
  : `${countDate(randomDate('01.01.1970', new Date()))} days ago`;

export const generateComments = () => ({
  count: 4,
  emoji: `/images/emoji/${generateEmoji()}.png`,
  text: 'Interesting setting and a good cast',
  info: {
    author: 'Tim Macoveev',
    day: generateDay()
  }
});
