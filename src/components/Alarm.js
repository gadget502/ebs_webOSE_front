import { gql } from "apollo-boost";
import { graphql, ApolloProvider } from "react-apollo";
import React from "react";
import BodyText from "@enact/ui/BodyText";
import style from "./css/alarm.less";

const has = Object.prototype.hasOwnProperty;

const object = {
  mon: "월",
  tue: "화",
  wed: "수",
  thu: "목",
  fri: "금",
  sat: "토",
  sun: "일"
};

const alarmListQuery = gql`
  query {
    runway {
      alarm {
        color
        hour
        min
        mon
        tue
        thu
        wed
        fri
        sat
        sun
        volume
        isEnabled
      }
    }
  }
`;

function check({ mon, tue, thu, wed, fri, sat, sun }) {
  const value = { mon, tue, wed, thu, fri, sat, sun };
  const result = [];
  for (let v of Object.keys(value)) {
    if (value[v]) result.push(object[v]);
  }
  return result.toString();
}

class Alarm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stuff: <div></div>,
      data: [],
      test: ""
    };

    const AlarmList = ({ data }) => {
      const { loading, error, runway } = data;
      if (loading) {
        return <p>Loading ...</p>;
      }
      if (error) {
        return <p>{error.message}</p>;
      }

      const { alarm } = runway;

      this.state.data = data;
      this.state.test = check(alarm);

      return (
        <div id="alarm-wrapper">
          <table id="alarm-table">
            <thead>
              <tr>
                <th>
                  알람 시간 {alarm.hour}:{alarm.min}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <BodyText id="day">{this.state.test.split(",")}</BodyText>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      );
    };

    const AlarmListWithData = graphql(alarmListQuery)(AlarmList);

    this.state.alarm = <AlarmListWithData />;
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    if (has.call(this.state.data, "refetch")) {
      this.state.data.refetch();

      this.setState({
        test: check(this.state.data.runway.alarm)
      });
    }
  }
  render() {
    return this.state.alarm;
  }
}

export default Alarm;
