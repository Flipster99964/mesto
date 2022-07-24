export default class Section {
    constructor({ items, renderer }, containerSelector) {
      this._renderedItems = items;
      this._renderer = renderer;
      this._container = containerSelector;
    }
  //метод отвечает за отрисовку всех элементов
    renderItems() {
      this._renderedItems.forEach(item => this._renderer(item));
    }
  // метод принимает DOM-элемент и добавляет его в контейнер
    addItem(element) {
      this._container.prepend(element);
    }
  }