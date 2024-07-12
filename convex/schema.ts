import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    defaults: defineTable({
        materialName: v.string(),
        taskCategory: v.string(),
        units: v.string(),
    }),

    tasks: defineTable({
        orgId: v.string(),
        assignedTo: v.string(),
        dueDate: v.string(),
        priority: v.string(),
        remarks: v.string(),
        skilledWorkers: v.float64(),
        taskCategory: v.string(),
        taskName: v.string(),
        unSkilledWorkers: v.float64(),
        workDone: v.float64(),
    }).index(
        "by_orgId",
        ["orgId"]
    ),

    users: defineTable({
        tokenIdentifier: v.string(),
    }),

});