const { gql } = require('apollo-server');
// import gql from apollo-server and create a variable called typeDefs for our schema:
const typeDefs = gql`
  # Your schema will go here
    """Object types"""
    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
    }

    type Rocket {
        id: ID!
        name: String
        type: String
    }

    type User {
        id: ID!
        email: String!
        trips: [Launch]!
        token: String
    }

    type Mission {
        name: String
        missionPatch(size: PatchSize): String
    }

    enum PatchSize {
        SMALL
        LARGE
    }

    """The Query type"""
    type Query {
        "launches will return an array of all upcoming Launches"
        launches: [Launch]!
        "launch will return a single Launch that corresponds to the id argument provided to the query"
        launch(id: ID!): Launch
        "me query will return details for the User that's currently logged in"
        me: User
    }

    """The Mutation type"""
    type Mutation {
        "bookTrips mutation enables a logged-in user to book a trip on one or more Launches (specified by an array of launch IDs)."
        bookTrips(launchIds: [ID]!): TripUpdateResponse!
        "cancelTrip mutation enables a logged-in user to cancel a trip that they previously booked."
        cancelTrip(launchId: ID!): TripUpdateResponse!
        "login mutation enables a user to log in by providing their email address"
        login(email: String): User
    }

    """The Mutation Response"""

    type TripUpdateResponse {
        success: Boolean!
        message: String
        launches: [Launch]
    }


`;

module.exports = typeDefs;