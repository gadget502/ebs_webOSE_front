import { gql } from "apollo-boost";
import { graphql, ApolloProvider } from "react-apollo";
import React from "react";

const stuffQuery = gql`
  query {
    stuffs
  }
`;

const StuffList = ({ data: { loading, error, stuffs } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div id="alarm-wrapper">
      <div>
        이물건들은 잊지말고 꼭 챙기세요!: {Object.keys(stuffs).toString()}
      </div>
    </div>
  );
};

const StuffListWithData = graphql(stuffQuery)(StuffList);

class Stuff extends React.Component {
  render() {
    return <StuffListWithData />;
  }
}
export default Stuff;
