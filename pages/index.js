import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/ToDoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const todosList = document.querySelector(".todos__list");
const counterText = document.querySelector(".counter__text");

const handleCheck = (checked) => {
  todoCounter.updateCompleted(checked);
};

const handleDelete = (completed) => {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
};

// Reusable function to create and add a todo
const renderTodo = (data) => {
  const todoElement = generateTodo(data);
  section.addItem(todoElement);
};

// Function to generate a Todo
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
};

// Initialize section
const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

section.renderItems();

// Add Todo Popup
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-Todo-popup",
  handleFormSubmit: (formValues) => {
    const { name, date } = formValues;
    const newTodo = {
      id: uuidv4(),
      name,
      date: new Date(date),
      completed: false,
    };
    renderTodo(newTodo);
    todoCounter.updateTotal(true);
  },
});

addTodoPopup.setEventListeners();

// Initialize TodoCounter
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// Open the Add Todo popup
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// Initialize form validation
const formValidator = new FormValidator(
  validationConfig,
  document.querySelector(".popup__form")
);
formValidator.enableValidation();
