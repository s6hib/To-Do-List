document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const inputTask = document.getElementById('inputTask');
  const taskList = document.getElementById('taskList');

  form.addEventListener('submit', event => {
    event.preventDefault();
    addTask(inputTask.value);
    inputTask.value = '';
  });

  function addTask(name) {
    const taskElement = document.createElement('li');
    taskElement.classList.add('task');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
      taskElement.classList.toggle('done');
      updateLocalStorage();
    });

    const label = document.createElement('label');
    label.innerText = name;

    const delButton = document.createElement('button');
    delButton.innerText = 'x';
    delButton.addEventListener('click', () => {
      taskElement.remove();
      updateLocalStorage();
    });

    taskElement.appendChild(checkbox);
    taskElement.appendChild(label);
    taskElement.appendChild(delButton);

    taskList.appendChild(taskElement);

    updateLocalStorage();
  }

  function updateLocalStorage() {
    const tasks = [...taskList.children].map(task => ({
      name: task.textContent,
      done: task.classList.contains('done')
    }));

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(taskData => {
    addTask(taskData.name);
    if (taskData.done) {
      taskList.lastChild.classList.add('done');
    }
  });
});
