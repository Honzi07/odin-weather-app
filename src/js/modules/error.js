class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'HTTP Error';
    this.statusCode = statusCode;
  }

  showHttpErrorImg() {
    const mainEl = document.querySelector('main');
    const errWrapperEl = document.createElement('div');
    const img = document.createElement('img');

    mainEl.innerHTML = '';
    errWrapperEl.classList.add('http-error-wrapper');

    Object.assign(img, {
      className: 'http-error-img',
      src: `https://http.cat/${this.statusCode}`,
      alt: `HTTP error code with an image of a cat. Code:${this.statusCode}`,
    });

    mainEl.appendChild(errWrapperEl);
    errWrapperEl.appendChild(img);
  }
}

export { HttpError };
