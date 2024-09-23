// Get elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('task-item');
    if (task.completed) {
      li.classList.add('completed');
    }

    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-buttons">
        <button class="complete-btn" onclick="completeTask(${index})">
          ${task.completed ? 'Undo' : 'Complete'}
        </button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// Add new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  tasks.push({ text: taskText, completed: false });
  taskInput.value = '';

  saveTasks();
  renderTasks();
}

// Mark task as completed or incomplete
function completeTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for adding tasks
addTaskButton.addEventListener('click', addTask);

// Render tasks on page load
renderTasks();
