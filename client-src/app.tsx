import * as React from "react";
import {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppBar from "material-ui/AppBar";
import "normalize.css/normalize.css"
import RaisedButton from "material-ui/RaisedButton";
import {autobind} from "core-decorators";
import {Api} from "./api/api";
import {RegisterView} from "./auth/register-view";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import {AppStores} from "./stores/app-stores";
import {AppSnackBar} from "./stores/snack-bar-store";
import {Provider} from "mobx-react";
import {SnackBarView} from "./snack-bar-view";

const stores: AppStores = {
  snackBarStore: AppSnackBar
};

export default class App extends Component<{}, { count: number; }> {
  interval: number;
  state = {count: 0};

  //This state will be maintained during hot reloads
  componentWillMount() {
    this.interval = window.setInterval(() => {
      this.setState({count: this.state.count + 1})
    }, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  @autobind
  onTestClick() {
    Api.test().then(res => {
      AppSnackBar.setMessage("Api working");
      console.log(res)
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Provider {...stores}>
          <div>
            <AppBar title="My AppBar"/>
            <RegisterView/>

            <br/>
            <RaisedButton label="test api"
                          onClick={this.onTestClick}/>
            <SnackBarView/>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}