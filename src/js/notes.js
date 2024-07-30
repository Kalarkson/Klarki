let tasks = [];

// Функция загрузки задач (в данном случае, просто инициализация списка)
function loadTasks() {
  tasks = [];
  renderTaskList(tasks);
}

// Функция рендеринга списка задач
function renderTaskList(tasks) {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskHTML = `
      <li class="task">
        <span class="task-name">${task.name}</span>
        <span class="task-description">${task.description}</span>
        <button class="delete-task-btn" data-index="${index}">Delete</button>
      </li>
    `;
    taskList.insertAdjacentHTML('beforeend', taskHTML);
  });
}

// Создание новой задачи
document.getElementById('create-task-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const taskName = document.getElementById('task-name').value.trim();
  const taskDescription = document.getElementById('task-description').value.trim();

  if (taskName === '' || taskDescription === '') {
    alert('Please fill in both task name and description');
    return;
  }

  // Добавление новой задачи в список
  tasks.push({ name: taskName, description: taskDescription });
  renderTaskList(tasks);
  document.getElementById('task-name').value = '';
  document.getElementById('task-description').value = '';
});

// Удаление задачи
document.getElementById('task-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-task-btn')) {
    const taskIndex = parseInt(e.target.dataset.index);
    // Удаление задачи из списка
    tasks.splice(taskIndex, 1);
    renderTaskList(tasks);
  }
});

// Инициализация списка задач
loadTasks();