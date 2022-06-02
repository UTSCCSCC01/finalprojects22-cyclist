const userResolver = require("./user");
const taskResolver = require("./task");
const tagResolver = require("./tag");
const noteResolver = require("./note");
const achieResolver = require("./achievement");
const rootResolver = {
    ...userResolver,
    ...taskResolver,
    ...tagResolver,
    ...noteResolver,
    ...achieResolver,
};
module.exports = rootResolver;