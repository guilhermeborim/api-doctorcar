class AppErrorCallStack extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 400) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}

class AppError {
  message: string;
  statusCode: number;
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { AppError, AppErrorCallStack };
