import {ApiError} from "./api-error";

export class AuthError extends ApiError {
  constructor(message: string) {
    super(401, message);
  }

}