const Tag = require("../../database/tag");
const ObjectId = require('mongodb').ObjectId;
module.exports = {
    createTag: async (args,req) =>{
        if(!req.isAuth){
            throw new Error("User not authenticated");
        }
        try{
            let check = await Tag.find({creater: ObjectId(req.userId),
            $or:[{name:args.name}, {color:args.color}]});
            if(check.length !== 0){
                throw new Error("User has a task group with same name/color, try another one");
            }
            let newTag = new Tag({
                creater: req.userId,
                name: args.name,
                color: args.color,
                icon:0,
                totalExpectedTime: 0,
                totalActualTime: 0,
            })
            let result = await newTag.save();
            return result;
        }catch(err){
            throw err;
        }
    },
    // return all tags the user has
    getAllTag: async (args,req) =>{
        if(!req.isAuth){
            throw new Error("User not authenticated");
        }
        try{
            let tags = await Tag.find({creater: ObjectId(req.userId)});
            return tags;
        }catch(err){
            throw err;
        }
    },
    // return single tag info of the given tagId
    getTag: async (args,req) =>{
        if(!req.isAuth){
            throw new Error("User not authenticated");
        }
        try{
            let tag = await Tag.findById(args.tagId);
            if(tag.creater.valueOf() !== req.userId){
                throw new Error("You are not tag creater");
            }
            return tag;
        }catch(err){
            throw err;
        }
    },
}