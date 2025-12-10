// src/utils/response.util.ts
export type ApiSuccess<T> = {
  statusCode: number;
  success: true;
  data: T | null;
  message?: string;
};

export type ApiError = {
  statusCode: number;
  success: false;
  message: string;
};

export class ResponseUtil {
  static Ok<T>(
    statusCode = 200,
    data: T | null = null,
    message?: string,
  ): ApiSuccess<T> {
    return { statusCode, success: true, data, message };
  }

  static Error(statusCode = 500, message = 'Internal Server Error'): ApiError {
    return { statusCode, success: false, message };
  }
}
