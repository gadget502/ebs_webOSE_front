import React from "react";

function currentTime() {
  let today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  return h + ":" + m + ":" + s;
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
