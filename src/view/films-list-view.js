import AbstractView from './abstract-view';

const renderFilmsList = () => (
  `<sction class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
    </section>
  </sction>`
);

export default class FilmListView extends AbstractView {
  get template() {
    return renderFilmsList();
  }
}
