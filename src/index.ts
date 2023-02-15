// Todo List App

interface Todo {
  text: string;
  completed: boolean;
}

const btn = document.querySelector("#btn")!;
const input = document.querySelector("#todoinput")! as HTMLInputElement;
const form = document.querySelector("#todoform") as HTMLFormElement;
const list = document.querySelector("#todolist") as HTMLUListElement;

const todos: Todo[] = readTodos();

todos.forEach(createTodo);
const todoJSON = localStorage.getItem("todos");
console.log("Local Storage todos:", JSON.parse(todoJSON!));
// Todo constants

function readTodos(): Todo[] {
  const todoJSON = localStorage.getItem("todos");
  if (todoJSON === null) return [];
  return JSON.parse(todoJSON);
}
// Pake Todo[] soalnya dia bacain array of object

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// DOM

function createTodo(todo: Todo) {
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

function handleSubmit(e: SubmitEvent) {
  e.preventDefault();
  const newTodo: Todo = {
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
