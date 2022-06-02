const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    nickName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        
    },
    totalTask:{
        type: Number,
    },
    completedTask:{
        type: Number,
    },
    dayMood:[{
        date:{
            type: Date,
        },
        mood:{
            type: Number,
        },
    }],
    address:[{
        name:{
            type: String,
        },
        address:{
            type: String,
        },
    }],
    achievement:[{
        _id:{
            type: Schema.Types.ObjectId,
            ref:'Achievement',
        },
        status:{
            type: String,
        },
        data:{
            type: Number,
        },
    }],
});
module.exports = mongoose.model('User', userSchema);