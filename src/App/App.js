import kind from "@enact/core/kind";
import MoonstoneDecorator from "@enact/moonstone/MoonstoneDecorator";
import Panels from "@enact/moonstone/Panels";
import Text from "@enact/i18n/Text";
import VirtualList from "@enact/moonstone/VirtualList";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { graphql, ApolloProvider } from "react-apollo";
import BodyText from "@enact/ui/BodyText";

import MainPanel from "../views/MainPanel";
import css from "./App.module.less";

import React from "react";
import Clock from "./clock";
import Stuff from "./stuff";

const client = new ApolloClient({
  uri: "http://localhost:5000/runway-249610/us-central1/graphql"
});

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

const AlarmList = ({ data: { loading, error, runway } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  function check({ mon, tue, thu, wed, fri, sat, sun }) {
    const value = { mon, tue, thu, wed, fri, sat, sun };
    const result = [];
    for (let v of Object.keys(value)) {
      if (value[v]) result.push(v);
    }
    return result;
  }

  const { alarm } = runway;
  const dayResult = check(alarm);

  return (
    <div id="alarm-wrapper">
      <div>
        알람 시간 {alarm.hour}:{alarm.min}
      </div>
      <Text id="day">{dayResult.toString()}</Text>
    </div>
  );
};

const AlarmListWithData = graphql(alarmListQuery)(AlarmList);

const App = kind({
  name: "App",

  styles: {
    css,
    className: "app"
  },

  render: props => (
    <div {...props}>
      <Clock></Clock>
      <ApolloProvider client={client}>
        <AlarmListWithData />
        <Stuff />
      </ApolloProvider>
    </div>
  )
});

export default MoonstoneDecorator(App);
