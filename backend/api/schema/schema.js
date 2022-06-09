const {buildSchema} = require("graphql");

module.exports = buildSchema(`
type user {
    _id: ID!
    nickName: String!
    email: String!
    password: String
}
type authdata{
    userId: ID!
    email: String!
    nickName: String!
}
type liteTask{
    _id: ID!
    name: String
}
type mood{
    _id: ID
    date: String
    score: Float
}
type task{
    _id: ID!
    creater: ID
    day: Int
    month: Int
    year: Int
    hierarchy: String
    startTime: Int
    expectedDuration: Float
    actualDuration: Float
    start: String
    repeatOrSingle: String
    dayWeekMonth: String
    frequency: String
    repeatStartDay: String
    content: String
    tag: ID
    important: Boolean
    identity: String
    subTask: [liteTask]
    parentTask: liteTask
    mood: [mood]
    location: String
}
type RootQuery {
    emailLogin(email: String!, password: String!): authdata!
    getDailyTask(day: Int!, month: Int!, year:Int!): [task!]
    getMonthTask(month: Int!, year: Int!): [task!]
    getFutureTask(year: Int): [task!]
    getSingleTask(id: ID!): task
}
type RootMutation {
    createUser(email: String!, nickName: String!, password: String!): authdata!
    createTask(hierarchy: String!, day: Int, month: Int, year:Int!, repeat: String!, dayWeekMonth: String, frequency: String, content:String!, startTime: Int!, expectedDuration: Int): ID!
    rateDifficulty(id: ID!, score: Float!): String
    markSignifier(id: ID!, field: String, value: String): String!
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);