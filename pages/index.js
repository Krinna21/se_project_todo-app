import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

// Function to generate and return a todo DOM element
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

// Section instance
const section = new Section({
  items: initialTodos, // Pass the initialTodos array
  renderer: (item) => {
    const todo = generateTodo(item); // Create a todo DOM element
    section.addItem(todo); // Use Section's addItem to append it to the container
  },
  containerSelector: ".todos__list", // Selector for the todo list container
});

section.renderItems(); // Render initial todos on page load

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  const todoElement = generateTodo(values);

  section.addItem(todoElement); // Use Section's addItem to add the new todo

  closeModal(addTodoPopup);

  newTodoValidator.resetValidation();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
