const {buildSchema} = require("graphql");

module.exports = buildSchema(`
type user {
    _id: ID!
    nickName: String!
    email: String!
    password: String
}
type Authdata{
    userId: ID!
    email: String!
    nickName: String!
}
type RootQuery {
    emailLogin(email: String!, password: String!): Authdata!
}
type RootMutation {
    createUser(email: String!, nickName: String!, password: String!): Authdata!
    createTask(hierarchy: String!, day: Float!, month: Float!, year:Float!, repeat: String!, dayWeekMonth: String, frequency: String): ID!
    rateDifficulty(id: ID!, score: Float!): String
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);