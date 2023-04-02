export default class LoadMore {
  constructor(selector) {
    this.btn = this.getBtn(selector);
  }

  getBtn(selector) {
    return document.querySelector(selector);
  }

  show() {
    this.btn.classList.remove('is-hidden');
  }

  hidden() {
    this.btn.classList.add('is-hidden');
  }
}
