import {types} from "mobx-state-tree";

export const RegisterStore = types.model({
  email: "",
  password: ""
}).actions(self => ({
  setEmail(email: string) {
    self.email = email;
  },
  setPass(pass: string) {
    self.password = pass;
  }
}));

export type RegisterStore = typeof RegisterStore.Type;