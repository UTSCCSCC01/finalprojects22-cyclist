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
    name: String
    day: Int
    month: Int
    year: Int
    hierarchy: String
    startTime: String
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
    completed: Boolean
    abandoned: Boolean
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
    getAllTask(type: String):[task!]
}
type RootMutation {
    createUser(email: String!, nickName: String!, password: String!): authdata!
    createTask(hierarchy: String!, date: String!, repeat: String, dayWeekMonth: String, frequency: String, content:String!, startTime: String, expectedDuration: Int, name:String!): task
    rateDifficulty(id: ID!, score: Float!): String
    markSignifier(id: ID!, important:Boolean, completed:Boolean, abandoned:Boolean): task
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);