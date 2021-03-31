// Axios for our http request
const axios = require('axios');

const {
    GraphQLObjectType,
    //Types
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

//Object Types
// Song Type - We declare a type using the type keyword
// Schema containing object types that contain fields each field has a type of it's own
// each field can be scalar such as Int or a String OR it can be another object type
// A field can also contain a list, indicated by square brackets:
const SongType = new GraphQLObjectType({
    name: 'song', // all object types have to have a name
    fields: () => ({
        id: {type: GraphQLString},
        albumart: {type: GraphQLString},
        author: {type: GraphQLString},
        song: {type: GraphQLString},
        json: {type: GraphQLString},
        audio: {type: GraphQLString},
        points: {type: GraphQLString}
    })
})


// The Query Type -
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType', // all object types have to have a name
    fields: {
        songs: {
            type: SongType,
            args: {
                id:{type:GraphQLString}
            },
            resolve(songs, args){
                for(let i = 0; i < songs.length; i++){
                    if(songs[i].id == args.id){
                        return songs[i];
                    }
                }
                return axios.get('http://localhost:3000/songs/'+ args.id)
                    .then(res => res.data);
            }
        },

        songs: {
            type: new GraphQLList(SongType),
            resolve(parentValue, args){
                // return songs;
                return axios.get('http://localhost:3000/songs/')
                    .then(res => res.data);
            }
        }
    }

});

// Hardcoded Data which is now in the data.json file
//eg.
// const customers = [
//     {
//         id:'1',
//         name: 'John Doe',
//         email: 'jdoe@gmail.com',
//         age:35
//     },
//     {
//         id:'2',
//         name: 'Sarah Williams',
//         email: 'sarah@gmail.com',
//         age:22
//     },
//     {
//         id:'3',
//         name: 'Steve Johns',
//         email: 'steveo@gmail.com',
//         age:25
//     },
// ]

module.exports = new GraphQLSchema({
    query: RootQuery
});