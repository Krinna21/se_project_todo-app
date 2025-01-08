class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item); // Call the renderer and pass the item
    });
  }

  addItem(element) {
    this._container.append(element); // Appends the provided element to the container
  }
}

export default Section;
