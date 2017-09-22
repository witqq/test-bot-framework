import Axios from "axios";
import {AppSnackBar} from "../stores/snack-bar-store";

Axios.defaults.baseURL = "api/";

Axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const message = error.response.data && error.response.data.message;
  if (message) {
    AppSnackBar.setMessage(message);
  }
  else if (error.message) {
    AppSnackBar.setMessage(error.message);
  }
  return Promise.reject(error);
});

export class Api {
  private static apiUrl = "api/";

  public static test() {
    return Axios.get("test");
  }

  public static register(email: string, password: string) {
    return Axios.post("register", {email, password});
  }

  public static login(email: string, password: string) {
    return Axios.post("login", {email, password});
  }

  public static logout() {
    return Axios.get("logout");
  }
}