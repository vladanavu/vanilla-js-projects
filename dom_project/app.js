//Define UI Vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEventListeners();

//Load all event listeners

function loadEventListeners() {
  //Add task event
  form.addEventListener("submit", addTask);
  //Remove task event
  taskList.addEventListener("click", removeTask);
  //Clear task events
  clearBtn.addEventListener("click", clearTasks);
  //Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

//Get tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.forEach(function(task) {
  //Create li el
  const li = document.createElement("li");
  //Add class
  li.className = "collection-item";
  //Create text node and append to li
  li.appendChild(document.createTextNode(task));
  //Create new link el
  const link = document.createElement("a");
  //Add class
  link.className = "delete-item secondary-content";
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"> </i>';
  //Append the link to li
  li.appendChild(link);
  //Append li to ul
  taskList.appendChild(li);

  });
}

//Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  //Create li el
  const li = document.createElement("li");
  //Add class
  li.className = "collection-item";
  //Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //Create new link el
  const link = document.createElement("a");
  //Add class
  link.className = "delete-item secondary-content";
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"> </i>';
  //Append the link to li
  li.appendChild(link);
  //Append li to ul
  taskList.appendChild(li);
  //Store in LS
 storeTaskInLocalStorage(taskInput.value);

  //Clear input
  taskInput.value = "";

  e.preventDefault();
}

//Store task

storeTaskInLocalStorage(task) {
let tasks;
if(localStorage.getItem('tasks') === null) {
  tasks = [];
} else {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.push(task);

localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Remove task

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

//Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  } 
  tasks.forEach(function(task, index){
if(taskItem.textContent === task){
  tasks.splice(index, 1);

}
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Clear tasks

function clearTasks() {
  taskList.innerHTML = "";

  //Clear tasks from LS
  clearTasksFromLocalStorage();
}

//Clear tasks from LS

function clearTasksFromLocalStorage() {
  localStorage.clear();
}
//Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase(); //this will get us what is being typed in
  document.querySelectorAll(".collection-item").forEach(
    //querySelectorAll returns node list
    function(task) {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = "block";
      } else {
        task.style.display = "none";
      }
    }
  );
}
