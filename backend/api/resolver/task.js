const Task = require("../../database/task");
module.exports = {
    createTask: async args => {
        try{
            const newTask = new Task({
                creater: "6297e22dab2c042c8dd6effb",
                planningDate: args.date,
                hierarchy: args.hierarchy,
                startTime: 0,
                expectedDuration: 0,
                actualDuration: 0,
                start: new Date().toISOString(),
                repeatOrSingle: "single",
                frequency: 0,
                repeatStartDay: null,
                content: "test content",
                tag: null,
                important: false,
                identity: "parent",
                subTask:[],
                parentTask: null,
                mood: 0,
                difficulty: 0,
                location:null,
            })
            const result = await newTask.save();
            return result.id;
        } catch(err){
            throw err;
        }
    },
}