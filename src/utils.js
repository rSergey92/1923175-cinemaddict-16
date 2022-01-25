import AbstractView from './view/abstract-view';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const formattedTime = (runtime) => {
  const hours = Math.trunc(runtime / 60);
  const minutes = runtime % 60;
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export const randomDate = (firstDate, secondDate) => {
  const date1 = new Date(firstDate).getTime();
  const date2 = new Date(secondDate).getTime();

  return (date1 > date2)
    ? new Date(getRandomInteger(date2, date1))
    : new Date(getRandomInteger(date1, date2));
};

export const countDate = (dayComment) => {
  const date1 = new Date(dayComment);
  const date2 = new Date();
  return Math.floor((date2.getTime() - date1.getTime())/(1000*60*60*24));
};

export const replace = (newElement, oldElement) => {
  if (newElement === null || oldElement === null) {
    throw new Error ('Can\'t replace unexisting elements');
  }

  const newChild = newElement instanceof AbstractView ? newElement.element : newElement;
  const oldChild = oldElement instanceof AbstractView ? oldElement.element : oldElement;

  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error ('Parent element doesn\'t exist');
  }
  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error ('Can remove only components');
  }
  component.element.remove();
  component.removeElement();
};

export const sortFilmDate = (cardA, cardB) => cardB.filmInfo.release.date - cardA.filmInfo.release.date;
export const sortFilmRating = (cardA, cardB) => cardB.filmInfo.totalRating - cardA.filmInfo.totalRating;
