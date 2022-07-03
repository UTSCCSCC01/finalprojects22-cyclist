const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tagSchema = new Schema({
    creater:{
        type: Schema.Types.ObjectId,
        ref:'User',
    },
    name:{
        type: String,
        required: true,
    },
    color:{
        type: Number,
        required: true,
    },
    icon:{
        type: Number,
        required: true,
    },
    totalExpectedTime:{
        type: Number,
    },
    totalActualTime:{
        type: Number,
    },
});
module.exports = mongoose.model('Tag', tagSchema);