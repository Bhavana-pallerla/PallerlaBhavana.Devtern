document.addEventListener('DOMContentLoaded', loadTodos);

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        addTodoToDOM(todo, index);
    });
}

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoTime = document.getElementById('todo-time');
    const todoText = todoInput.value.trim();
    const todoDateTime = todoTime.value;

    if (todoText && todoDateTime) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push({ text: todoText, time: todoDateTime });
        localStorage.setItem('todos', JSON.stringify(todos));
        addTodoToDOM({ text: todoText, time: todoDateTime }, todos.length - 1);
        todoInput.value = '';
        todoTime.value = '';
    }
}

function addTodoToDOM(todo, index) {
    const todoList = document.getElementById('todo-list');
    const li = document.createElement('li');
    li.setAttribute('data-index', index);

    const dateTime = new Date(todo.time);
    const formattedDateTime = isNaN(dateTime.getTime())
        ? todo.time
        : dateTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

    li.innerHTML = `
        <input type="text" value="${todo.text} - ${formattedDateTime}" disabled>
        <div class="actions">
            <button onclick="editTodo(${index})">Edit</button>
            <button onclick="deleteTodo(${index})">Delete</button>
        </div>
    `;
    todoList.appendChild(li);
}

function editTodo(index) {
    const todoList = document.getElementById('todo-list');
    const li = todoList.querySelector(`li[data-index="${index}"]`);
    const input = li.querySelector('input');
    const isEditing = input.disabled;

    if (isEditing) {
        input.disabled = false;
        li.querySelector('.actions button').innerText = 'Save';
    } else {
        input.disabled = true;
        const [text, time] = input.value.split(' - ');
        const todos = JSON.parse(localStorage.getItem('todos'));
        todos[index].text = text;
        todos[index].time = new Date(time).toISOString();
        localStorage.setItem('todos', JSON.stringify(todos));
        li.querySelector('.actions button').innerText = 'Edit';
    }
}

function deleteTodo(index) {
    const todos = JSON.parse(localStorage.getItem('todos'));
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    loadTodos();
}
