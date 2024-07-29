// index.js
// Initialize the database connection
let db;

tauri.plugin.sql.connect('sqlite:tasks.db').then((database) => {
  db = database;
  // Create the tasks table if it doesn't exist
  db.execute('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, name TEXT, description TEXT, status TEXT)');
  // Load existing tasks from the database
  loadTasks();
});

// Load tasks from the database
function loadTasks() {
  db.execute('SELECT * FROM tasks').then((result) => {
    const tasks = result.rows;
    renderTaskList(tasks);
  });
}

// Render the task list
function renderTaskList(tasks) {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const taskHTML = `
      <li class="task">
        <span class="task-name">${task.name}</span>
        <span class="task-description">${task.description}</span>
        <button class="delete-task-btn" data-id="${task.id}">Delete</button>
      </li>
    `;
    taskList.insertAdjacentHTML('beforeend', taskHTML);
  });
}

// Create a new task
// Create a new task
document.getElementById('create-task-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const taskName = document.getElementById('task-name').value.trim();
    const taskDescription = document.getElementById('task-description').value.trim();
  
    if (taskName === '' || taskDescription === '') {
      alert('Please fill in both task name and description');
      return;
    }
  
    // Insert the new task into the database
    db.execute('INSERT INTO tasks (name, description, status) VALUES (?,?,?)', [taskName, taskDescription, 'new']).then(() => {
      // Call loadTasks() to refresh the task list
      loadTasks();
      document.getElementById('task-name').value = '';
      document.getElementById('task-description').value = '';
    });
  });

// Delete a task
document.getElementById('task-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-task-btn')) {
    const taskId = e.target.dataset.id;
    // Delete the task from the database
    db.execute('DELETE FROM tasks WHERE id =?', [taskId]).then(() => {
      loadTasks();
    });
  }
});