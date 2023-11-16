import { readFromLocalStorage } from './readFromLocalStorage';
import { saveToLocalStorage } from './saveToLocalStorage';

const todoList = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todo');
const todoFunFakt = document.querySelector('.p-todo');

let todos = readFromLocalStorage('todos') || [];

function todo() {
  const renderTodos = function () {
    todos.length > 0
      ? (todoFunFakt.style.display = 'none')
      : (todoFunFakt.style.display = 'block');

    todoList.innerHTML = '';
    for (let i = 0; i < todos.length; i++) {
      const todoItem = document.createElement('li');
      todoItem.classList.add('todo-item');
      todoItem.innerHTML = `
      <label for="todo-check-${i}">
      <input type="checkbox" id="todo-check-${i}" name="todo-check">
      <span class="checkbox-button"></span>
      </label>
      <p class="task-text">${todos[i].text}</p>
      <button class="delete-btn"></button>`;

      let deleteBtn = todoItem.querySelector('.delete-btn');
      let check = todoItem.querySelector('input[name="todo-check"]');
      let taskText = todoItem.querySelector('.task-text');
      if (todos[i].done) {
        check.checked = true;
        taskText.style.textDecoration = 'line-through';
        taskText.style.opacity = 0.7;
      }

      check.addEventListener('click', function () {
        check.checked
          ? ((taskText.style.textDecoration = 'line-through'),
            (taskText.style.opacity = 0.7))
          : ((taskText.style.textDecoration = 'none'),
            (taskText.style.opacity = 1));
        todos[i].done = check.checked;
        saveToLocalStorage('todos', todos);
      });

      deleteBtn.addEventListener('click', function () {
        todos.splice(i, 1);
        saveToLocalStorage('todos', todos);
        renderTodos();
      });

      todoList.appendChild(todoItem);
    }
  };

  todoInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13 && todoInput.value.trim() !== '') {
      let task = { text: todoInput.value, done: false };
      todos.push(task);
      todoInput.value = '';
      saveToLocalStorage('todos', todos);
      renderTodos();
    }
  });

  renderTodos();
}

export { todo };
