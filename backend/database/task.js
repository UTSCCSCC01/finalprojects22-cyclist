const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = new Schema({
    creater:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    planningDate:{
        type: Date,
        required: true,
    },
    hierarchy:{
        type: String,
        required: true,
    },
    startTime:{
        type: Number,
    },
    expectedDuration:{
        type: Number,
    },
    actualDuration:{
        type: Number,
    },
    start:{
        type: Date,
    },
    repeatOrSingle:{
        type: String
    },
    frequency:{
        type: Number,
    },
    repeatStartDay:{
        type: Date,
    },
    content:{
        type: String,
        required: true,
    },
    tag:{
        type: Schema.Types.ObjectId,
        ref:'Tag',
    },
    important:{
        type: Boolean,
    },
    identity:{
        type: String,
    },
    subTask:[{
        _id:{
            type: Schema.Types.ObjectId,
            ref:'Task',
        },
        name:{
            type: String,
        }
    }],
    parentTask:{
        _id:{
            type: Schema.Types.ObjectId,
            ref:'Task',
        },
        name:{
            type: String,
        },
    },
    mood:{
        type: Number,
    },
    difficulty:[{
        date:{
            type: Date,
        },
        score:{
            type: Number,
        },
    }],
    location:{
        type: String,
    },
});
taskSchema.set('timestamps',true);
module.exports = mongoose.model('Task', taskSchema);