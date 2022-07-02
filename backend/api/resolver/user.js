const User = require("../../database/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require("validator");
module.exports = {
    createUser: async args => {
        try {
            if(!validator.isEmail(args.email)){
              throw new Error("Wrong format of email or name");
            }
            const user = await User.findOne({ email: args.email });
            if (user) {
                throw new Error("User with email "+ args.email+" already exists");
            }
            const pass = await bcrypt.hash(args.password, 12);
            const newUser = new User({
                nickName: args.nickName,
                email: args.email,
                password: pass,
                totalTask: 0,
                completedTask: 0,
                dayMood:[],
                address:[],
                achievement:[]
            });
            const result = await newUser.save();
            const token = jwt.sign({userId: result.id, email:result.email}, 'cyclist secret', {
                expiresIn:'1h'
            });
            return {
                userId: result.id,
                email: result.email,
                nickName: result.nickName,
                token: token,
            }
        } catch (err) {
            throw err;
        }
    },
    emailLogin: async args =>{
        const user = await User.findOne({email:args.email});
        if(!user){
            throw new Error("User with email "+args.email+" does not exist");
        }
        const equal = await bcrypt.compare(args.password,user.password);
        if(!equal){
            throw new Error("Wrong password");
        }
        // await User.updateOne(
        //     {email:args.email},
        //     {$set:{status:"login"}}
        // );
        const token = jwt.sign({userId: user.id, email:user.email}, 'my token secret', {
            expiresIn:'1h'
        });
        return {
            userId: user.id,
            email: user.email,
            nickName: user.nickName,
            token: token,
        }
    },
    // logout: async (args,req) =>{
    //     if(!req.isAuth){
    //         return ("User not found");
    //     }
    //     const user = await User.findOne({_id:req.userId});
    //     await User.updateOne(
    //         {_id:req.userId},
    //         {$set:{status:"logout"}}
    //     );
    //     return "logout";
    // },
}