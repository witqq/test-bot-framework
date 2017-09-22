import {Schema, model, Document} from "mongoose";
import {hashSync, compareSync, genSaltSync} from "bcrypt-nodejs";

export interface User extends Document {
  local: {
    email: string
    password: string;
  }
  generateHash: typeof generateHash;
  validPassword: typeof validPassword;
}

export const userSchema = new Schema({
  local: {
    email: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }

});

const generateHash = (password: string) => {
  return hashSync(password, genSaltSync(8));
};

const validPassword = (password: string) => {
  return compareSync(password, this.local.password);
};

userSchema.methods.generateHash = generateHash;

// checking if password is valid
userSchema.methods.validPassword = validPassword;

// create the model for users and expose it to our app
export const User = model<User>("User", userSchema);