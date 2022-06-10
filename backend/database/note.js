const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const noteSchema = new Schema({
    creater:{
        type: Schema.Types.ObjectId,
        ref:'User',
    },
    content:{
        type: String,
        required: true,
    },
    planningDate:{
        type: Date,
        required: true,
    },
});
noteSchema.set('timestamps',true);
module.exports = mongoose.model('Note', noteSchema);