"use strict";
// Todo List App
const btn = document.querySelector("#btn");
const input = document.querySelector("#todoinput");
const form = document.querySelector("#todoform");
const list = document.querySelector("#todolist");
const todos = readTodos();
todos.forEach(createTodo);
const todoJSON = localStorage.getItem("todos");
console.log("Local Storage todos:", JSON.parse(todoJSON));
// Todo constants
function readTodos() {
    const todoJSON = localStorage.getItem("todos");
    if (todoJSON === null)
        return [];
    return JSON.parse(todoJSON);
}
// Pake Todo[] soalnya dia bacain array of object
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
// DOM
function createTodo(todo) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", function () {
        todo.completed = !todo.completed;
        saveTodos();
    });
    li.append(checkbox, todo.text);
    list.append(li);
}
function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
        text: input.value,
        completed: false,
    };
    createTodo(newTodo);
    todos.push(newTodo);
    saveTodos();
    alert(`Added ${newTodo.text} to list!`);
}
// localStorage.getItem("todos") && console.log(todoJSON);
form.addEventListener("submit", handleSubmit);
