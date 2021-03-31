//Our Apollo Server
// imports the ApolloServer class from apollo-server
const { ApolloServer } = require('apollo-server');
//passing our server our imported schema via the typeDefs property
const typeDefs = require('./schema');
//New instance of Apollo server
const server = new ApolloServer({ typeDefs });
// var cors = require('cors')

// server.use(cors())
server.listen().then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/dev
    `);
  });
