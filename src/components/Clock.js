import React from "react";
import moment from "moment-timezone";
import style from "./css/clock.less";

function currentTime() {
  let today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  return moment()
    .tz("Asia/Seoul")
    .format("HH:mm:ss");
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: currentTime()
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: currentTime()
    });
  }
  render() {
    return <p className="App-clock"> 현재 시각은 {this.state.time}.</p>;
  }
}
export default Clock;
