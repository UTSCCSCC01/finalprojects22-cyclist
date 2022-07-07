const Task = require("../../database/task");
const Tag = require("../../database/tag");
const ObjectId = require('mongodb').ObjectId;
module.exports = {
    createTask: async (args,req) => {
        if(!req.isAuth){
            throw new Error("User not authenticated");
        }
        try{
            let dwm;
            let fre;
            let repeatStartDay;
            let year;
            let month = 0;
            let day = 0;
            let tag;
            let color;
            if(args.tagID === "null"){
                tag = null;
                color = null;
            }else{
                tag = args.tagID;
                let tagInfo = await Tag.findById(args.tagId);
                if(tag.creater.valueOf() !== req.userId){
                    throw new Error("You are not tag creater");
                }
                color = tagInfo.color;
            }
            if(args.hierarchy === "monthly" || args.hierarchy === "future"){
                year = parseInt(args.date.split("-")[0]);
                month = parseInt(args.date.split("-")[1]);
            }else if(args.hierarchy === "daily"){
                year = parseInt(args.date.split("-")[0]);
                month = parseInt(args.date.split("-")[1]);
                day = parseInt(args.date.split("-")[2]);
            }else{
                throw new Error("Invalid hierarchy");
            }
            if(!args.repeat){
                dwm = null;
                fre = null;
                repeatStartDay = null;
            }else{
                dwm = args.dayWeekMonth;
                fre = args.frequency;
                let date = month+"/"+day+"/"+year;
                repeatStartDay = new Date(date).toISOString();
            }
            const newTask = new Task({
                creater: req.userId,
                name: args.name,
                day: day,
                month: month,
                year: year,
                hierarchy: args.hierarchy,
                startTime: args.startTime,
                expectedDuration: 0,
                actualDuration: 0,
                start: new Date().toISOString(),
                isRepeat: args.repeat,
                dayWeekMonth: dwm,
                frequency: fre,
                repeatStartDay: repeatStartDay,
                content: args.content,
                tag: tag,
                color: color,
                important: false,
                identity: "parent",
                subTask:[],
                parentTask: null,
                mood: [],
                difficulty: [],
                location:null,
            })
            const result = await newTask.save();
            return result;
        } catch(err){
            throw err;
        }
    },
    rateDifficulty: async (args,req) =>{
        try{
            if(!req.isAuth){
                throw new Error("User not authenticated");
            }
                let task = await Task.findById(args.id);
                if(!task){
                    throw new Error("task not found");
                }
                if(task.creater.valueOf() !== req.userId){
                    throw new Error("you are not creater");
                }
                if(!task.isRepeat && task.difficulty !== [] ){
                    throw new Error("Task has already been rated!");
                }
                const newRate = {
                    date: new Date().toISOString(),
                    score: args.score,
                }
                await task.difficulty.push(newRate);
                await task.save();
                return "success!";
        } catch(err){
            throw err;
        }
    },
    getDailyTask: async (args,req)=>{
        try{
            if(!req.isAuth){
                throw new Error("User not authenticated");
            }
            let dailyTask = await Task.find({hierarchy:"daily", day:args.day, month:args.month, 
            year:args.year, creater: ObjectId(req.userId),isRepeat:false});
            let todayDate = args.month+"/"+args.day+"/"+args.year;
            let yesterday = new Date(todayDate);
            yesterday.setDate(yesterday.getDate()-1);
            // let yesterdayTask = await Task.find({hierarchy:"daily", day:yesterday.getDate(), month:yesterday.getMonth()+1, 
            // year:yesterday.getFullYear(), creater: ObjectId(req.userId),isRepeat:false});
            let repeatTask = await Task.find({hierarchy:"daily", creater: ObjectId(req.userId),isRepeat:true});

            repeatTask.forEach(function(task){
                if(task.dayWeekMonth === "day"){
                    let taskDate = task.month+"/"+task.day+"/"+task.year;
                    let taskDay = new Date(taskDate);
                    let today = new Date(todayDate);
                    let days = Math.floor((today.getTime()-taskDay.getTime())/ (1000*3600*24));
                    if((days % parseInt(task.frequency)) === 0){
                        dailyTask.unshift(task);
                    }
                }else if(task.dayWeekMonth === "week"){
                    let today = new Date(todayDate).getDay().toString();
                    if(task.frequency.includes(today)){
                        dailyTask.unshift(task);
                    }
                }else if (task.dayWeekMonth === "month"){
                    let today = new Date(todayDate).getDate();
                    let frequency = parseInt(task.frequency);
                    if(frequency === today){
                        dailyTask.unshift(task);
                    }
                }
            });
            // dailyTask = yesterdayTask.concat(dailyTask);
            return dailyTask;
        } catch(err){
            throw err;
        }
    },
    getMonthTask: async (args,req)=>{
        try{
            if(!req.isAuth){
                throw new Error("User not authenticated");
            }
            let monthTask = await Task.find({hierarchy:"monthly", month:args.month, 
            year:args.year, creater: ObjectId(req.userId)});
            return monthTask;
        } catch(err){
            throw err;
        }
    },
    getFutureTask: async (args,req)=>{
        try{
            if(!req.isAuth){
                throw new Error("User not authenticated");
            }
            let futureTask = await Task.find({hierarchy:"future", creater: ObjectId(req.userId)});
            return futureTask;
        } catch(err){
            throw err;
        }
    },
    markSignifier: async (args,req)=>{
        try{
            if(!req.isAuth){
                throw new Error("User not authenticated");
            }
            let task = await Task.find({_id:ObjectId(args.id), creater: ObjectId(req.userId)});
            console.log(task);
            return "done";
        } catch(err){
            throw err;
        }
    },
    getSingleTask: async (args,req)=>{
        try{
            if(!req.isAuth){
                throw new Error("User not authenticated");
            }
            let task = await Task.findById(args.id);
            return task;
        } catch(err){
            throw err;
        }
    },
    getAllTask: async (args,req)=>{
        try{
            if(!req.isAuth){
                throw new Error("User not authenticated");
            }
            // if(args.type == "all")
            let task = await Task.find({creater: ObjectId(req.userId)});
            return task;
        } catch(err){
            throw err;
        }
    },
}