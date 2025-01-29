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

function showGeoPositionError(errCode) {
  const statusText = document.querySelector('.status-message__text');

  const errDescription = {
    1: 'User denied the request for Geolocation.',
    2: 'Location information is unavailable.',
    3: 'The request to get user location timed out.',
    4: 'An unknown error occurred.',
  };

  statusText.textContent = errDescription[errCode];
}

export { HttpError, showGeoPositionError };
