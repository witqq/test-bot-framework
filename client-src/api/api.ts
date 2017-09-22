import Axios from "axios";

Axios.defaults.baseURL = "api/";

export class Api {
  private static apiUrl = "api/";

  public static test() {
    return Axios.get("test");
  }

  public static register(email: string, password: string) {
    return Axios.post("register", {email, password});
  }
}