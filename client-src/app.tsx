import * as React from "react";
import {Component} from "react";

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

  render() {
    return (
      <div>
        <h1>Hello world1!</h1>
        <div>Welcome to hot-reloading React written in TypeScript! {this.state.count}</div>
      </div>
    );
  }
}