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

// Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
})

// Root Query - all object types have to have a name
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
                // for(let i = 0; i < customers.length; i++){
                //     if(customers[i].id == args.id){
                //         return customers[i];
                //     }
                // }
                return axios.get('http://localhost:3000/customers/'+ args.id)
                    .then(res => res.data);
            }
        },

        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args){
                // return customers;
                return axios.get('http://localhost:3000/customers/')
                    .then(res => res.data);
            }
        }
    }

});

// Hardcoded Data which is now in the data.json file
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