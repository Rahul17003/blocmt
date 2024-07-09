import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    assignedTo: v.string(),
    dueDate: v.string(),
    priority: v.string(),
    remarks: v.string(),
    skilledWorkers: v.float64(),
    taskCategory: v.string(),
    taskName: v.string(),
    unSkilledWorkers: v.float64(),
    workDone: v.float64(),
  }),
});