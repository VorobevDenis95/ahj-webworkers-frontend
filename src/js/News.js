import { formatDate } from './utils';

export default class News {
  constructor(data) {
    this.description = data.description;
    this.id = data.id;
    this.image = data.image;
    this.received = formatDate(data.received);
    // console.log(description, id, image, received);
    this.createNews();
  }

  createNews() {
    const list = document.querySelector('.news');

    const div = document.createElement('div');
    div.classList.add('news__item');
    div.innerHTML = ` 
    <div class="news__date">${this.received}</div>
    <div class="news__content ">
      <div class="news__img__box">
        <img src="${this.image}" alt="image">
      </div>
      <div class="news__text ">
      <p class="loader__title">${this.description}</p>
      </div>    
    `;
    list.append(div);
  }
}
