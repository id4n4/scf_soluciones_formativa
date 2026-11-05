const form = document.getElementById("form-tarea");
const taskText = document.getElementById("texto-tarea");
const counter = document.getElementById("contador");
const taskList = document.getElementById("lista-tareas");
const btnDeleteAll = document.getElementById("btn-borrar-todo");
const showJson = document.getElementById("ver-json");

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

const submit = (event) => {
  event.preventDefault();
  const value = taskText.value.trim();
  if (value === "") {
    return;
  }
  const task = {
    id: Date.now(),
    text: value,
    complete: false,
  };
  tasks.push(task);

  saveTask();
  printTaskList();
  taskText.textContent = "";
};

const printTaskList = () => {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = task.text;

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "X";
    btnDelete.addEventListener("click", () => deleteTask(task.id));

    li.append(span, btnDelete);
    taskList.appendChild(li);
  });

  counter.textContent = `Tareas: ${tasks.length}`;
  showJson.textContent = JSON.stringify(tasks, null, 2);
};

const saveTask = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const deleteTask = (id) => {
  tasks = tasks.filter((v) => v.id !== id);
  saveTask();
  printTaskList();
};

const deleteAll = () => {
  tasks = [];
  localStorage.removeItem("tasks");
  saveTask();
  printTaskList();
};

printTaskList();

form.addEventListener("submit", submit);

btnDeleteAll.addEventListener("click", deleteAll);
