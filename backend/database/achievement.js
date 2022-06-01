const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const achievementSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    rule:{
        type: String,
    },
});
module.exports = mongoose.model('Achievement', achievementSchema);