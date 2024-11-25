//zod check
const { createTodoType, updateTodoType } = require("../utils/todoTypes");

//mongodb schema

const Todo = require("../models/todoModel");

// controllers

const createTodo = async (req, res) => {
  try {
    const { title, description, completed } = createTodoType.parse(req.body);

    const todo = await Todo.create({ title, description, completed });

    return res.status(201).send({
      message: "To-Do created successfully",
      todo,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    if (todos.length < 1) throw new Error(`Todo not found`);

    return res.status(200).json({ todos });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const completed = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ _id: id });

    if (!todo) throw new Error(`Todo not found`);

    await Todo.findByIdAndUpdate(
      {
        _id: id,
      },
      req.body
    );

    return res.status(200).json({ message: "Todo successfully completed" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    await updateTodoType.parse(req.body);

    const todo = await Todo.findOne({ _id: id });

    if (!todo) throw new Error(`Todo not found`);

    await Todo.findByIdAndUpdate(
      {
        _id: id,
      },
      req.body
    );

    return res.status(200).json({ message: "Todo successfully updated" });
  } catch (error) {
    return res.status(400).json({ error: `Provide valid Id` });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.findOneAndDelete({ _id: id });

    return res.status(200).json({ message: "Todo successfully deleted" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  completed,
  updateTodo,
  deleteTodo,
};
