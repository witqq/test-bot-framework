import * as React from "react";
import {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import AppBar from "material-ui/AppBar";
import "normalize.css/normalize.css"
import RaisedButton from "material-ui/RaisedButton";
import {autobind} from "core-decorators";
import {Api} from "./api/api";

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
      console.log(res)
    });
    Api.register("wit", "123").then(res => {
      console.log(res)
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <AppBar title="My AppBar"/>
          <RaisedButton label="test api"
                        onClick={this.onTestClick}/>
        </div>
      </MuiThemeProvider>
    );
  }
}