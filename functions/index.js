// index.js
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const GraphQLJSON = require("graphql-type-json");
const service = require("./service.json");

admin.initializeApp({
  databaseURL: "https://runway-249610.firebaseio.com",
  credential: admin.credential.cert({
    projectId: "runway-249610",
    clientEmail:
      "firebase-adminsdk-hz0q4@runway-249610.iam.gserviceaccount.com",
    private_key: service.private_key
  })
});

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  scalar JSON
  type Door {
    uid: String
    isLocked: Boolean
  }

  type alarm {
    color: String
    hour: String
    isEnabled: Boolean
    min: String
    mon: Boolean
    tue: Boolean
    thu: Boolean
    wed: Boolean
    fri: Boolean
    sat: Boolean
    sun: Boolean
    volume: Int
  }

  type mirror {
    schedule: Boolean
    time: Boolean
    traffic: Boolean
    weather: Boolean
  }

  type runway {
    user: String
    Door: Door
    alarm: alarm
    mirror: mirror
  }

  type time {
    end: String
    start: String
  }

  type Query {
    runway: runway
    sleepPattern: JSON
    stuffs: JSON
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    runway: async () => {
      const result = await admin
        .database()
        .ref()
        .once("value");
      const val = result.val();
      return val;
    },
    sleepPattern: async () => {
      const result = await admin
        .database()
        .ref("sleepPattern")
        .once("value");
      const val = result.val();
      return val;
    },
    stuffs: async () => {
      const result = await admin
        .database()
        .ref("stuff")
        .once("value");
      const val = result.val();
      return val;
    }
  }
};

// setup express cloud function
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/", cors: true });

exports.graphql = functions.https.onRequest(app);
