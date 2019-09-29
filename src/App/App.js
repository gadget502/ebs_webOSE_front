import kind from "@enact/core/kind";
import MoonstoneDecorator from "@enact/moonstone/MoonstoneDecorator";
import Panels from "@enact/moonstone/Panels";
import VirtualList from "@enact/moonstone/VirtualList";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { graphql, ApolloProvider } from "react-apollo";

import MainPanel from "../views/MainPanel";
import css from "./App.module.less";
import style from "./test.less";

import React from "react";
import Clock from "../components/Clock";
import Stuff from "../components/Stuff";
import Alarm from "../components/Alarm";
import Youtube from "../components/Youtube";

const client = new ApolloClient({
  uri: "http://175.193.196.36:5000/runway-249610/us-central1/graphql"
});

const App = kind({
  name: "App",

  styles: {
    css,
    className: "app"
  },

  render: props => (
    <div {...props}>
      <div id="rotate-wrapper">
        <Clock />
        <ApolloProvider client={client}>
          <Alarm />
          <Stuff />
        </ApolloProvider>
      </div>
    </div>
  )
});

export default MoonstoneDecorator(App);
