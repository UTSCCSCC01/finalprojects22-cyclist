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
    token: String!
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
    schedule: Boolean
    hierarchy: String
    dueTime: String
    dueDate: String
    expectedDuration: Float
    actualDuration: Float
    start: String
    notifiable: Boolean
    notifyTime: Int
    isRepeat: Boolean
    dayWeekMonth: String
    frequency: String
    repeatStartDay: String
    content: String
    tag: ID
    color: String
    important: Boolean
    completed: Boolean
    abandoned: Boolean
    identity: String
    subTask: [liteTask]
    parentTask: liteTask
    mood: [mood]
    location: String
}
type tag{
    _id: ID!
    creater: ID!
    name: String
    color: String
    icon: Int
    totalExpectedTime: Float
    totalActualTime: Float
}
type RootQuery {
    emailLogin(email: String!, password: String!): authdata!
    getDailyTask(day: Int!, month: Int!, year:Int!): [task!]
    getMonthTask(month: Int!, year: Int!): [task!]
    getMonthTaskNoDay(month: Int!, year: Int!): [task!]
    getFutureTask(year: Int): [task!]
    getSingleTask(id: ID!): task
    getAllTask(type: String):[task!]
    getAllTag(id: ID):[tag]
    getTag(tagId:ID):tag
    getLastMonthComp(field:String): Float
    getLastThreeMonthComp(field:String): Float
    getAllComp(field:String): Float
    getOverdue(field:String):[task!]
}
type RootMutation {
    createUser(email: String!, nickName: String!, password: String!): authdata!
    createTask(hierarchy: String, date: String!, repeat: Boolean, dayWeekMonth: String, 
        frequency: String, content:String, dueTime: String, expectedDuration: Int, 
        name:String!, tagID: ID, notifiable: Boolean, notifyTime: Int): task
    rateDifficulty(id: ID!, score: Float!): String
    markSignifier(id: ID!, important:Boolean, completed:Boolean, abandoned:Boolean): task
    deleteTask(id:ID!): String
    modifyTask(taskId: ID!, date: String!, repeat: Boolean, dayWeekMonth: String, 
        frequency: String, content:String, dueTime: String, expectedDuration: Int, 
        name:String!, tagID: ID, notifiable: Boolean, notifyTime: Int): task
    createTag(name:String!, color:String): tag
    test(taskId: ID!,hierarchy: String, date: String!, repeat: Boolean, dayWeekMonth: String, 
        frequency: String, content:String, dueTime: String, expectedDuration: Int, 
        name:String!, tagID: ID, notifiable: Boolean, notifyTime: Int): task
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);