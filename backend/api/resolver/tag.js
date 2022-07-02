const Tag = require("../../database/tag");
const ObjectId = require('mongodb').ObjectId;
module.exports = {
    createTag: async (args,req) =>{
        // if(!req.isAuth){
        //     throw new Error("User not authenticated");
        // }
        try{
            let check = await Tag.find({creater: ObjectId("6297e22dab2c042c8dd6effb"),
            $or:[{name:args.name}, {color:args.color}]});
            if(check.length !== 0){
                throw new Error("User has a task group with same name/color, try another one");
            }
            let newTag = new Tag({
                creater: "6297e22dab2c042c8dd6effb",
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
        // if(!req.isAuth){
        //     throw new Error("User not authenticated");
        // }
        try{
            let tags = await Tag.find({creater: ObjectId("6297e22dab2c042c8dd6effb")});
            return tags;
        }catch(err){
            throw err;
        }
    },
    // return single tag info of the given tagId
    getTag: async (args,req) =>{
        // if(!req.isAuth){
        //     throw new Error("User not authenticated");
        // }
        try{
            let tag = await Tag.findById(args.tagId);
            console.log(tag.creater);
            if(tag.creater.valueOf() !== "6297e22dab2c042c8dd6effb"){
                throw new Error("You are not tag creater");
            }
            return tag;
        }catch(err){
            throw err;
        }
    },
}