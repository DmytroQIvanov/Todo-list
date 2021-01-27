let inputTaskName = document.getElementById("input-task-name");
let inputTaskDescription = document.getElementById("input-task-description");

// ---Getting data {dataArray, styleArray}
let dataArray = [{}];
let styleArray = [{}];
let dataArrayHistory = [{}];
JSON.parse(localStorage.getItem("localData")) != null
  ? (dataArray = JSON.parse(localStorage.getItem("localData")))
  : (dataArray = [{}]);

JSON.parse(localStorage.getItem("localStyle")) != null
  ? (styleArray = JSON.parse(localStorage.getItem("localStyle")))
  : (styleArray = [{}]);

JSON.parse(localStorage.getItem("localDataHistory")) != null
  ? (dataArrayHistory = JSON.parse(localStorage.getItem("localDataHistory")))
  : (dataArrayHistory = [{}]);

changeStyle();
updateTaskList();

// ---Set Eventlisteners
document.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    addTask();
  }
});

// ---Add a task
function addTask(
  taskName = inputTaskName.value,
  taskDescription = inputTaskDescription.value
) {
  if (taskName != "") {
    dataArray.push({
      taskNameArray: taskName,
      taskDescriptionArray: taskDescription,
      taskDone: "",
    });
  }
  updateTaskList();
  inputTaskName.value = "";
  inputTaskDescription.value = "";
}

// ---Update task list
function updateTaskList() {
  let out = "";
  dataArray.map(function (name, indx) {
    out += `
      <div class="task-container">
      <div class="task-name ${name.taskDone}" >${name.taskNameArray}   ${indx}</div> 
      <div class="task-description">${name.taskDescriptionArray}</div>
      <button data-indx="${indx}" class="task-button" onclick="taskDelete(this)">Delete</button>
      <button data-indx="${indx}" class="task-button l" onclick="taskChange(this)">Change</button>
      <button data-indx="${indx}" class="task-button" onclick="taskDone(this)">Done</button>
      
      </div>`;
  });
  document.querySelector("#el").innerHTML = " ";

  localStorage.setItem("localData", JSON.stringify(dataArray));
  document.querySelector("#el").innerHTML = out;
}

// ---Delete task
function taskDelete(elem) {
  dataArray.splice(elem.dataset.indx, 1);
  addTask();
}

// ---Change task
function taskChange(elem) {
  if (inputTaskName.value != "") {
    dataArray[elem.dataset.indx].taskNameArray = inputTaskName.value;

    inputTaskName.value = "";
    inputTaskDescription.value = "";

    addTask();
  }
}
// ---Task Done
function taskDone(elem) {
  dataArray[elem.dataset.indx].taskDone == ""
    ? (dataArray[elem.dataset.indx].taskDone = "done")
    : (dataArray[elem.dataset.indx].taskDone = "");

  addTask();
}

// ---Change Style
function changeStyle() {
  document.body.classList.add(styleArray[0].backgroundC);

  let style = document.getElementsByName("style");

  for (let i = 0; i <= style.length - 1; i++) {
    if (style[i].checked == true) {
      styleArray = [{ backgroundC: style[i].value }];

      alert(styleArray[0].backgroundC);

      document.body.classList.remove("dark", "white", "blue");
      document.body.classList.add(styleArray[0].backgroundC);
    }
  }
  localStorage.setItem("localStyle", JSON.stringify(styleArray));
}

// ---Show Property
function showProperty() {
  document.getElementById("property-block").classList.toggle("show-property");
}
