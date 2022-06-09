const Task = require("../../database/task");
const ObjectId = require('mongodb').ObjectId;
module.exports = {
    createTask: async args => {
        // if(!req.isAuth){
        //     throw new Error("User not authenticated");
        // }
        try{
            let dwm;
            let fre;
            let repeatStartDay;

            if(args.repeat === "single"){
                dwm = null;
                fre = null;
                repeatStartDay = null;
            }else{
                dwm = args.dayWeekMonth;
                fre = args.frequency;
                let date = args.month+"/"+args.day+"/"+args.year;
                repeatStartDay = new Date(date).toISOString();
            }
            const newTask = new Task({
                creater: "6297e22dab2c042c8dd6effb",
                day: args.day,
                month: args.month,
                year: args.year,
                hierarchy: args.hierarchy,
                startTime: 0,
                expectedDuration: 0,
                actualDuration: 0,
                start: new Date().toISOString(),
                repeatOrSingle: args.repeat,
                dayWeekMonth: dwm,
                frequency: fre,
                repeatStartDay: repeatStartDay,
                content: "test content",
                tag: null,
                important: false,
                identity: "parent",
                subTask:[],
                parentTask: null,
                mood: [],
                difficulty: [],
                location:null,
            })
            const result = await newTask.save();
            return result.id;
        } catch(err){
            throw err;
        }
    },
    rateDifficulty: async args =>{
        try{
            // if(!req.isAuth){
            //     throw new Error("User not authenticated");
            // }
                let task = await Task.findById(args.id);
                if(!task){
                    throw new Error("task not found");
                }
                if(task.creater.valueOf() !== "6297e22dab2c042c8dd6effb"){
                    throw new Error("you are not creater");
                }
                if(task.repeatOrSingle === "single" && task.difficulty !== [] ){
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
    getDailyTask: async args=>{
        try{
            // if(!req.isAuth){
            //     throw new Error("User not authenticated");
            // }
            let dailyTask = await Task.find({hierarchy:"daily", day:args.day, month:args.month, 
            year:args.year, creater: ObjectId("6297e22dab2c042c8dd6effb"),repeatOrSingle:"single"});
            let todayDate = args.month+"/"+args.day+"/"+args.year;
            let yesterday = new Date(todayDate);
            yesterday.setDate(yesterday.getDate()-1);
            let month = yesterday.getMonth()+1;
            let yesterdayTask = await Task.find({hierarchy:"daily", day:yesterday.getDate(), month:yesterday.getMonth()+1, 
            year:yesterday.getFullYear(), creater: ObjectId("6297e22dab2c042c8dd6effb"),repeatOrSingle:"single"});
            let repeatTask = await Task.find({hierarchy:"daily", creater: ObjectId("6297e22dab2c042c8dd6effb"),repeatOrSingle:"repeat"});
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
                    let today = new Date(todayDate).getDate().toString();
                    if(task.frequency.includes(today)){
                        dailyTask.unshift(task);
                    }
                }
            });
            dailyTask = yesterdayTask.concat(dailyTask);
            return dailyTask;
        } catch(err){
            throw err;
        }
    },
    getMonthTask: async args=>{
        try{
            // if(!req.isAuth){
            //     throw new Error("User not authenticated");
            // }
            let monthTask = await Task.find({hierarchy:"monthly", month:args.month, 
            year:args.year, creater: ObjectId("6297e22dab2c042c8dd6effb")});
            return monthTask;
        } catch(err){
            throw err;
        }
    },
    getFutureTask: async args=>{
        try{
            // if(!req.isAuth){
            //     throw new Error("User not authenticated");
            // }
            let futureTask = await Task.find({hierarchy:"future", creater: ObjectId("6297e22dab2c042c8dd6effb")});
            return futureTask;
        } catch(err){
            throw err;
        }
    },
    markSignifier: async args=>{
        try{
            // if(!req.isAuth){
            //     throw new Error("User not authenticated");
            // }
            let task = await Task.find({_id:ObjectId(args.id), creater: ObjectId("6297e22dab2c042c8dd6effb")});
            console.log(task);
            return "done";
        } catch(err){
            throw err;
        }
    },
    getSingleTask: async args=>{
        try{
            // if(!req.isAuth){
            //     throw new Error("User not authenticated");
            // }
            let task = await Task.findById(args.id);
            return task;
        } catch(err){
            throw err;
        }
    },
}