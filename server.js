//My Simple Express Server
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js');

//App Variable and init express
const app = express();

//Entry point for any client that wants to interact with graphql in our server
app.use('/graphql', graphqlHTTP({
    //take in a config object with schema
    schema:schema,
    //boolean value for using garaphiql IDE to run tests etc
    graphiql:true
}));

//We wanna be able to run our server on port 4K
app.listen(4000, () => {
    console.log('Server is running on port 4K :p');
})

