export class HttpError extends Error {
  code: Error

  constructor(message, errorCode) {
      super(message);
      this.code = errorCode;
  }
}