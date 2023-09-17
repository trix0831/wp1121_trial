/* global axios */
const itemTemplate = document.querySelector("#todo-item-template");
const todoList = document.querySelector("#todos");

const view_content = document.getElementById("view-page");
const edit_content = document.getElementById("editing-page");
const add_diary_button = document.getElementById("add-diary-button");

let viewing = true;

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

async function main() {
  setupEventListeners();

  view_content.style.display = "block";
  edit_content.style.display = "none";

  try {
    const todos = await getTodos();
    todos.forEach((todo) => renderTodo(todo));
  } catch (error) {
    alert("Failed to load todos!");
  }
  
}

function setupEventListeners() {
  const addTodoButton = document.querySelector("#todo-add");
  const todoInput = document.querySelector("#todo-input");
  const todoDescriptionInput = document.querySelector(
    "#todo-description-input",
  );
  addTodoButton.addEventListener("click", async () => {
    const title = todoInput.value;
    const description = todoDescriptionInput.value;
    if (!title) {
      alert("Please enter a todo title!");
      return;
    }
    if (!description) {
      alert("Please enter a todo description!");
      return;
    }
    try {
      const todo = await createTodo({ title, description });
      renderTodo(todo);
    } catch (error) {
      alert("Failed to create todo!");
      return;
    }
    todoInput.value = "";
    todoDescriptionInput.value = "";
  });
}

function renderTodo(todo) {
  const item = createTodoElement(todo);
  todoList.appendChild(item);
}

function createTodoElement(todo) {
  const item = itemTemplate.content.cloneNode(true);

  const container = item.querySelector(".todo-item");
  container.id = todo.id;
  console.log(todo);

  // const checkbox = item.querySelector(`input[type="checkbox"]`);
  // checkbox.checked = todo.completed;
  // checkbox.dataset.id = todo.id;

  const title = item.querySelector("p.todo-title");
  title.innerText = todo.title;

  const description = item.querySelector("p.todo-description");
  description.innerText = todo.description;

  const deleteButton = item.querySelector("button.delete-todo");
  deleteButton.dataset.id = todo.id;
  deleteButton.addEventListener("click", () => {
    deleteTodoElement(todo.id);
  });

  return item;
}

async function deleteTodoElement(id) {
  try {
    await deleteTodoById(id);
  } catch (error) {
    alert("Failed to delete todo!");
  } finally {
    const todo = document.getElementById(id);
    todo.remove();
  }
}

async function getTodos() {
  const response = await instance.get("/todos");
  return response.data;
}

async function createTodo(todo) {
  const response = await instance.post("/todos", todo);
  return response.data;
}

// eslint-disable-next-line no-unused-vars
async function updateTodoStatus(id, todo) {
  const response = await instance.put(`/todos/${id}`, todo);
  return response.data;
}

async function deleteTodoById(id) {
  const response = await instance.delete(`/todos/${id}`);
  return response.data;
}

function toggleContent() {
  if (viewing) {
    view_content.style.display = "none";
    edit_content.style.display = "block";
  } else {
    view_content.style.display = "block";
    edit_content.style.display = "none";
  }
  
  viewing = !viewing;
}

add_diary_button.addEventListener("click", toggleContent);

main();
