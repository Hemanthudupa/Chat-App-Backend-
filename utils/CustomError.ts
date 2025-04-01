export class APIError extends Error {
  declare code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}
