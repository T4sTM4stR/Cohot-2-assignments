const zod = require("zod");

const createTodoType = zod.object({
  title: zod.string(),
  description: zod.string(),
  completed: zod.boolean(),
});

const updateTodoType = zod.object({
  title: zod.string(),
  description: zod.string(),
});

module.exports = { createTodoType, updateTodoType };
