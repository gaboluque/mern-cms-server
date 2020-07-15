class SuperError extends Error {
  constructor(message, code, type) {
    super(message);
    this.code = code;
    this.type = type;
  }
}

export default SuperError;
