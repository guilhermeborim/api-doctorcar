export interface ResponseApi {
  status: number;
  message: string;
  data: any;
}

export class SuccessResponse<T> {
  status: number;
  message: string;
  data: T;

  constructor(message: string, data: T) {
    this.status = 200;
    this.message = message;
    this.data = data;
  }
}

export class ErrorResponse {
  status: number;
  message: string;
  data: string | null;

  constructor(message: string, data: string | null = null) {
    this.status = 400;
    this.message = message;
    this.data = data;
  }
}

export class ServerErrorResponse {
  status: number;
  message: string;
  data: string;

  constructor(error: unknown) {
    this.status = 500;
    this.message = "Internal server error";
    this.data = error instanceof Error ? error.message : "Unknow error";
  }
}
