class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'HTTP Error';
    this.status = status;
  }
}

export default HttpError;
