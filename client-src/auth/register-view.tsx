import * as React from "react";
import {Component} from "react";
import {observer} from "mobx-react";
import {RegisterStore} from "./register-store";
import Card from "material-ui/Card";
import CardHeader from "material-ui/Card/CardHeader";
import CardText from "material-ui/Card/CardText";
import TextField from "material-ui/TextField";
import {autobind} from "core-decorators";
import RaisedButton from "material-ui/RaisedButton";
import {Api} from "../api/api";

@observer
export class RegisterView extends Component {

  store: RegisterStore;

  componentWillMount() {
    this.store = RegisterStore.create();
  }

  @autobind
  onEmailChange(e, email: string) {
    this.store.setEmail(email)
  }

  @autobind
  onPassChange(e, password: string) {
    this.store.setPass(password);
  }

  @autobind
  register() {
    const {email, password} = this.store;
    Api.register(email, password).then(res => {
      console.log(res);
    });
  }

  @autobind
  login() {
    const {email, password} = this.store;
    Api.login(email, password).then(res => {
      console.log(res);
    });
  }

  @autobind
  logout() {
    Api.logout().then(res => {
      console.log(res);
    });
  }

  render() {
    const store = this.store;
    return (
      <Card>
        <CardHeader title="Register account"/>
        <CardText>
          <TextField hintText="Email"
                     floatingLabelText="Email"
                     value={store.email}
                     onChange={this.onEmailChange}
          /><br/>
          <TextField hintText="Password"
                     floatingLabelText="Password"
                     value={store.password}
                     onChange={this.onPassChange}/>
          <br/>
          <RaisedButton label="Register"
                        onClick={this.register}/>
          <RaisedButton label="Login"
                        onClick={this.login}/>
          <RaisedButton label="Logout"
                        onClick={this.logout}/>
        </CardText>
      </Card>
    );
  }
}