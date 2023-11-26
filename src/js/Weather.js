import Modal from './Modal';
import News from './News';

export default class Weather {
  constructor(container) {
    this.container = container;
    this.modal = new Modal();
    this.url = 'https://webworkers.onrender.com/weather/news';

    this.init();
  }

  init() {
    this.bindToDom();
    this.addWorker();
    this.createRequest();
  }

  bindToDom() {
    const div = document.createElement('div');
    div.classList.add('container');
    div.innerHTML = `
    <header class="header">
      <h1 class="title">Новости</h1>
      <button type="button">Обновить</button>
    </header>
    <div class='news'>
    <div class='news__item block__item '>
      <div class="news__date block__data"></div>
       <div class="news__content  ">
        <div class="news__img__box block__img">
        </div>
      <div class="news__text ">
        <div class='block__text'></div>
        <div class='block__text'></div>
      </div>  
    </div>
    </div>
    <div class='news__item'>
      <div class="news__date block__data"></div>
       <div class="news__content ">
        <div class="news__img__box block__img">
      </div>
      <div class="news__text ">
        <div class='block__text'></div>
        <div class='block__text'></div>
      </div>  
    </div>
    </div>
    <div class='news__item'>
      <div class="news__date block__data"></div>
       <div class="news__content ">
        <div class="news__img__box block__img">
      </div>
      <div class="news__text ">
        <div class='block__text'></div>
        <div class='block__text'></div>
      </div>  
    </div>
    <div>
    `;
    this.container.append(div);
  }

  async createRequest() {
    try {
      const request = await fetch(this.url);
      this.data = await request.json();
      // console.log(this.data);
      const list = this.container.querySelector('.news');
      list.innerHTML = '';
      this.data.forEach((element) => {
        // eslint-disable-next-line no-unused-vars
        const result = new News(element);
      });
    } catch (err) {
      console.log(err);
      this.modal.openModal();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  addWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js', { scope: './' })
        .then((reg) => {
          console.log(`registration succeded/ Scope is ${reg.scope}`);
        }).catch((error) => {
          console.log(`registration failed with ${error}`);
        });
    }
  }
}
