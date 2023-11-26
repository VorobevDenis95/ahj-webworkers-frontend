/* eslint-disable class-methods-use-this */
export default class Modal {
  constructor() {
    this.root = document.querySelector('#root');
  }

  openModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
      <div class='modal__container'>
        <p class='text__modal'>
          Не удалось загрузить данные 
          Проверьте подключение 
          и обновите страницу
        </p>
      </div>
    `;
    this.root.append(modal);
  }

  closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.remove();
    }
  }
}
