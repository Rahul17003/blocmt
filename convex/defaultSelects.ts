import { query } from "./_generated/server";

export const defaultSelects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('defaults').collect();
  },
});