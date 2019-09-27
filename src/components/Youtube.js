import React from "react";
import YouTube from "react-youtube";

import { gql } from "apollo-boost";
import { graphql, ApolloProvider } from "react-apollo";
import BodyText from "@enact/ui/BodyText/BodyText";

const youtubeQuery = gql`
  query {
    runway {
      youtube {
        play
        vid
      }
    }
  }
`;

class Youtube extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      youtube: {
        vid: "",
        play: false
      },
      data: []
    };

    const getYoutubeObj = ({ data }) => {
      const { loading, error, runway } = data;
      const { play, vid } = runway;
      if (loading) {
        return <p>Loading ...</p>;
      }
      if (error) {
        return <p>{error.message}</p>;
      }

      this.state.data = data;
      this.state.youtube = runway.youtube;

      return true;
    };

    graphql(youtubeQuery, { pollInterval: 500 })(getYoutubeObj);
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    if ("refetch" in this.state.data) this.state.data.refetch();
  }

  render() {
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        autoplay: 1
      }
    };

    return (
      <YouTube
        videoId={this.state.youtube.vid}
        opts={opts}
        onReady={this._onReady}
      />
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}
