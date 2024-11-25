const express = require("express");
const router = express.Router();

// CONTROLLERS
const {
  createTodo,
  getAllTodos,
  completed,
  updateTodo,
  deleteTodo,
} = require("../controller/todoController");

router.post("/createTodo", createTodo);
router.get("/getAllTodos", getAllTodos);
router.patch(`/completed/:id`, completed);
router.patch("/updateTodos/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);

module.exports = router;
