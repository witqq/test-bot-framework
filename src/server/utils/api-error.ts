import {BaseException} from "./exceptions";

export class ApiError extends BaseException {
  constructor(public status: number, public message: string) {
    super(message);
  }
}