const Task = require("../../database/task");
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
                repeatStartDay = new Date().toISOString();
            }
            const newTask = new Task({
                creater: "6297e22dab2c042c8dd6effb",
                planningDate: args.date,
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
            try{
                let task = await Task.findById(args.id);
                if(!task){
                    throw new Error("task not found");
                }
                console.log(task);
                console.log(task.creater);
                console.log(task.creater.valueOf());
                if(task.creater.valueOf() !== "6297e22dab2c042c8dd6effb"){
                    throw new Error("creater not found");
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
                
            }catch(err){
                console.log(err);
                throw err;
            }
        } catch(err){
            throw err;
        }
    },
}