import { gql } from "apollo-boost";
import { graphql, ApolloProvider } from "react-apollo";
import React from "react";
import style from "./css/stuff.less";
import BodyText from "@enact/ui/BodyText/BodyText";
import Spinner from "@enact/ui/Spinner";

const stuffQuery = gql`
  query {
    stuffs
  }
`;
const has = Object.prototype.hasOwnProperty;
class Stuff extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stuff: <div></div>,
      data: []
    };

    const StuffList = ({ data }) => {
      const { loading, error, stuffs } = data;
      if (loading) {
        return <p>Loading ...</p>;
      }
      if (error) {
        return <p>{error.message}</p>;
      }

      this.state.data = data;

      return Object.keys(stuffs).toString();
    };

    const StuffListWithData = graphql(stuffQuery, { pollInterval: 500 })(
      StuffList
    );

    this.state.stuff = <StuffListWithData />;
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    if (has.call(this.state.data, "refetch")) this.state.data.refetch();
    // this.setState({
    //   stuff: <StuffListWithData />
    // });
  }
  render() {
    return (
      <div id="alarm-wrapper">
        <div>
          <h1>이 물건들은 잊지말고 꼭 챙기세요!</h1>
          <BodyText id="stuff">{this.state.stuff}</BodyText>
        </div>
      </div>
    );
  }
}
export default Stuff;
