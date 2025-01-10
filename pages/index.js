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

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

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
    const todoElement = generateTodo(newTodo);
    section.addItem(todoElement);
    todoCounter.updateTotal(true);
  },
});

addTodoPopup.setEventListeners();

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const formValidator = new FormValidator(
  validationConfig,
  document.querySelector(".popup__form")
);
formValidator.enableValidation();
