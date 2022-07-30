const { async } = require("jshint/src/prod-params");
const Task = require("../../database/task");
const Tag = require("../../database/tag");
const ObjectId = require('mongodb').ObjectId;
//62b4a2421115bad92e1b5efd
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
            let month;
            let day = 0;
            let tag;
            let color;
            let time;
            let schedule;
            let expectedDuration = args.hour*60+args.minute;
            if(args.tagID === "" || args.tagID === "null"){
                tag = null;
                color = "";
            }else{
                tag = args.tagID;
                let tagInfo = await Tag.findById(args.tagID);
                if(!tagInfo){
                    throw new Error("wrong tag id")
                }
                if(tagInfo.creater.valueOf() !== req.userId){
                    throw new Error("You are not tag creater");
                }
                color = tagInfo.color;
            }
            year = args.date.split("-")[0];
            month = args.date.split("-")[1];
            schedule = false;
            if(args.date.split("-").length === 3){
                day = args.date.split("-")[2];
                schedule = true;
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
            time = args.dueTime;
            if(args.dueTime === "null"){
                time = "";
            }
            const newTask = new Task({
                creater: req.userId,
                name: args.name,
                day: day,
                month: month,
                year: year,
                schedule: schedule,
                hierarchy: "daily",
                dueTime: time,
                dueDate: args.date,
                hour: args.hour,
                minute:args.minute,
                expectedDuration: expectedDuration,
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
                completed:false,
                abandoned:false,
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
    modifyTask: async (args, req) => {
        if(!req.isAuth){
            throw new Error("User not authenticated");
        }
        try{
            let dwm;
            let fre;
            let repeatStartDay;
            let year;
            let month;
            let day = 0;
            let tag;
            let color;
            let time;
            let schedule;
            let expectedDuration = args.hour*60+args.minute;
            let task = await Task.find({_id:ObjectId(args.taskId), creater: ObjectId(req.userId)});
            if(task.length === 0){
                throw new Error("wrong task id or task is not created by you");
            }
            if(args.tagID === ""|| args.tagID === "null"){
                tag = null;
                color = "";
            }else{
                tag = args.tagID;
                let tagInfo = await Tag.findById(args.tagID);
                if(!tagInfo){
                    throw new Error("No such tag");
                }
                if(tagInfo.creater.valueOf() !== req.userId){
                    throw new Error("You are not tag creater");
                }
                color = tagInfo.color;
            }
            year = args.date.split("-")[0];
            month = args.date.split("-")[1];
            schedule=false;
            if(args.date.split("-").length === 3){
                day = args.date.split("-")[2];
                schedule = true;
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
            time = args.dueTime;
            if(args.dueTime === "null"){
                time = "";
            }
            await Task.updateOne(
                {_id: args.taskId},
                {$set:{name:args.name, day:day, month: month, year: year, 
                    dueTime: time, dueDate: args.date,isRepeat: args.repeat,
                    dayWeekMonth: dwm,frequency: fre,repeatStartDay: repeatStartDay,
                    content: args.content, tag: tag, color: color,schedule:schedule,
                    hour: args.hour,minute:args.minute,expectedDuration:expectedDuration}}
            );
            task = await Task.findById(args.taskId);
            return task;
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
        if(!req.isAuth){
            throw new Error("User not authenticated");
        }
        try{
            let dailyTask = await Task.find({day:args.day, month:args.month, 
            year:args.year, creater: ObjectId(req.userId),isRepeat:false, dueTime:{$ne:""}}).sort({dueTime:1});
            let noTimeTask = await Task.find({day:args.day, month:args.month, 
                year:args.year, creater: ObjectId(req.userId),isRepeat:false, dueTime:""});
            let todayDate = args.month+"/"+args.day+"/"+args.year;
            // let yesterday = new Date(todayDate);
            // yesterday.setDate(yesterday.getDate()-1);
            // let yesterdayTask = await Task.find({hierarchy:"daily", day:yesterday.getDate(), month:yesterday.getMonth()+1, 
            // year:yesterday.getFullYear(), creater: ObjectId(req.userId),isRepeat:false});
            let repeatTask = await Task.find({creater: ObjectId(req.userId),isRepeat:true});

            repeatTask.forEach(function(task){
                if(task.dayWeekMonth === "day"){
                    let taskDate = task.month+"/"+task.day+"/"+task.year;
                    let taskDay = new Date(taskDate);
                    let today = new Date(todayDate);
                    if(today.getTime()-taskDay.getTime() >= 0){
                        let days = Math.floor((today.getTime()-taskDay.getTime())/ (1000*3600*24));
                        if((days % parseInt(task.frequency)) === 0){
                            if(task.dueTime === "null" || task.dueTime=== ""){
                                noTimeTask.push(task)
                            }else{
                                for(var i=0; i<dailyTask.length || i===0; i++){
                                    if(dailyTask.length === 0){
                                        dailyTask.push(task);
                                        break;
                                    }
                                    if(dailyTask[i].dueTime > task.dueTime){
                                        dailyTask.splice(i,0,task);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }else if(task.dayWeekMonth === "week"){
                    let taskDate = task.month+"/"+task.day+"/"+task.year;
                    let taskDay = new Date(taskDate);
                    let today = new Date(todayDate);
                    if(today.getTime()-taskDay.getTime() >= 0){
                        let today = new Date(todayDate).getDay().toString();
                        if(task.frequency.includes(today)){
                            if(task.dueTime === "null" || task.dueTime=== ""){
                                noTimeTask.push(task)
                            }else{
                                for(var i=0; i<dailyTask.length || i===0; i++){
                                    if(dailyTask.length === 0){
                                        dailyTask.push(task);
                                        break;
                                    }
                                    if(dailyTask[i].dueTime > task.dueTime){
                                        dailyTask.splice(i,0,task);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }else if (task.dayWeekMonth === "month"){
                    let taskDate = task.month+"/"+task.day+"/"+task.year;
                    let taskDay = new Date(taskDate);
                    let today = new Date(todayDate);
                    if(today.getTime()-taskDay.getTime() >= 0){
                        let today = new Date(todayDate).getDate();
                        let frequency = parseInt(task.frequency);
                        if(frequency === today){
                            if(task.dueTime === "null" || task.dueTime=== ""){
                                noTimeTask.push(task)
                            }else{
                                for(var i=0; i<dailyTask.length || i===0; i++){
                                    if(dailyTask.length === 0){
                                        dailyTask.push(task);
                                        break;
                                    }
                                    if(dailyTask[i].dueTime > task.dueTime){
                                        dailyTask.splice(i,0,task);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            });
            dailyTask = dailyTask.concat(noTimeTask);
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
            let day = new Date();
            let monthTask = await Task.find({day:{$gt:day.getDate()+5}, month:args.month, 
                year:args.year, creater: ObjectId(req.userId)}).sort({day:1});
            // let noday = await Task.find({day:0, month:args.month, 
            // year:args.year, creater: ObjectId(req.userId)});
            // monthTask = monthTask.concat(noday);
            return monthTask;
        } catch(err){
            throw err;
        }
    },
    getMonthTaskNoDay: async (args,req)=>{
        try{
            if(!req.isAuth){
                throw new Error("User not authenticated");
            }
            let monthTask = await Task.find({day:0, month:args.month, 
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
            let allTasks = [];
            var day = new Date();
            day.setDate(1);
            for(let i=1; i<13;i++){
                day.setMonth(day.getMonth()+1);
                let futureTask = await Task.find({month:day.getMonth()+1, 
                    year:day.getFullYear(), creater: ObjectId(req.userId)}).sort({day:1});
                allTasks = allTasks.concat(futureTask);

            }
            return allTasks;
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
            let task = await Task.find({creater: ObjectId(req.userId)});
            return task;
        } catch(err){
            throw err;
        }
    },
    deleteTask: async (args,req)=>{
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
            await Task.deleteOne({_id: ObjectId(args.id)});
            return "done";
        } catch(err){
            throw err;
        }
    },
    test: async args=>{
        try{
            let dwm;
            let fre;
            let repeatStartDay;
            let year;
            let month;
            let day = 0;
            let tag;
            let color;
            let time;
            let schedule;
            let expectedDuration = args.hour*60+args.minute;
            if(args.tagID === "" || args.tagID === "null"){
                tag = null;
                color = "";
            }else{
                tag = args.tagID;
                let tagInfo = await Tag.findById(args.tagID);
                if(tagInfo.creater.valueOf() !== req.userId){
                    throw new Error("You are not tag creater");
                }
                color = tagInfo.color;
            }
            year = args.date.split("-")[0];
            month = args.date.split("-")[1];
            schedule = false;
            if(args.date.split("-").length === 3){
                schedule = true;
                day = args.date.split("-")[2];
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
            time = args.dueTime;
            if(args.dueTime === "null"){
                time = "";
            }
            const newTask = new Task({
                creater: "62b4a2421115bad92e1b5efd",
                name: args.name,
                day: day,
                month: month,
                year: year,
                schedule: schedule,
                hierarchy: "daily",
                dueTime: time,
                dueDate: args.date,
                hour: args.hour,
                minute:args.minute,
                expectedDuration: expectedDuration,
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
    markSignifier: async (args, req)=>{
        try{
            if(!req.isAuth){
                throw new Error("User not authenticated");
            }
            //62b4a2421115bad92e1b5efd   user
            //62ce5122c58dd1afa145534c   task
            let task = await Task.find({_id:ObjectId(args.id), creater: ObjectId(req.userId)});
            if(task.length === 0){
                throw new Error("wrong task id");
            }
            if(args.completed && args.abandoned){
                throw new Error("task can't be both completed and abandoned");
            }
            await Task.updateOne(
                {_id: args.id},
                {$set:{important:args.important, completed:args.completed, abandoned:args.abandoned}}
            );
            let actual = args.hour*60+args.minute;
            task = await Task.findById(args.id);
            if(task.expectedDuration > 0 && actual > 0){
                await Task.updateOne(
                    {_id: args.id},
                    {$set:{actualDuration:actual}}
                );
                await Tag.updateOne(
                    {_id: task.tag},
                    {$inc:{totalExpectedTime:task.expectedDuration, totalActualTime:actual}}
                );
            }
            task = await Task.findById(args.id);
            return task;
        } catch(err){
            throw err;
        }
    },
    suggestion: async (args, req)=>{
        try{
            if(!req.isAuth){
                throw new Error("User not authenticated");
            }
            //62b4a2421115bad92e1b5efd   user
            //62cca051539ee0f4eebbd484   tag
            //62ce5122c58dd1afa145534c   task
            let tag = await Tag.findById(args.tagID);
            if(!tag){
                throw new Error("wrong tag id");
            }
            if(tag.creater.valueOf() !== req.userId){
                throw new Error("You are not tag creater");
            }
            if(tag.totalActualTime === 0){
                throw new Error("don't have enough tasks to predict")
            }
            let ratio = tag.totalActualTime / tag.totalExpectedTime;
            let total = args.hour* 60 + args.minute;
            let suggestion = ratio* total;
            let sugHour = parseInt(suggestion/60);
            let sugMinute = parseInt(suggestion%60);
            let result={hour:sugHour, minute:sugMinute};
            return result;
        } catch(err){
            throw err;
        }
    },
}