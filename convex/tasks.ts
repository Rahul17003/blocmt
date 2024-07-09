import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createTask = mutation({
    args: {
        taskName: v.string(),
        taskCategory: v.string(),
        dueDate: v.string(),
        workDone: v.number(),
        skilledWorkers: v.number(),
        unSkilledWorkers: v.number(),
        assignedTo: v.string(),
        priority: v.string(),
        remarks: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new ConvexError('Please sign-in to perform tasks')
        }
        const taskId = await ctx.db.insert("tasks",
            {
                taskName: args.taskName,
                taskCategory: args.taskCategory,
                dueDate: args.dueDate,
                workDone: args.workDone,
                skilledWorkers: args.skilledWorkers,
                unSkilledWorkers: args.unSkilledWorkers,
                assignedTo: args.assignedTo,
                priority: args.priority,
                remarks: args.remarks,
            }
        );
    },
});

export const getTasks = query({
    args: {},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            return [];
        }
        return ctx.db.query('tasks').collect()
    },
});